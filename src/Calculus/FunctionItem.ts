import { RenderItem, RenderItemCreateOptions, RenderItemBounds } from '../Base/RenderItem';
import { View } from '../View';
import { applyProps } from '../Utils/props';
import { LineStyle, LineStyleOptions } from '../Style/LineStyle';

export interface FunctionItemCreateOptions extends RenderItemCreateOptions {
    /**
     * Graph function resolution (number of points to draw).
     */
    resolution?: number;
    /**
     * The line style options.
     */
    lineStyle?: LineStyleOptions;
    /**
     * The y(x) function to render.
     */
    function?: string;
    /**
     * The breakDistance is an distance to break the graph in
     * two lines. This is used to prevent the draw graph in
     * breaks of limits in e.g. tan(x) and 1/x
     */
    breakDistance?: number;
    /**
     * Function rendering domain start.
     */
    domainStart?: number;
    /**
     * Function rendering domain end.
     */
    domainEnd?: number;
}

export interface FunctionItemCapturePointOptions {
    x: number;
    yPadding?: number;
    xPadding?: number;
}

export class FunctionItem implements RenderItem {
    /**
     * name of the item.
     */
    name: string;
    
    /**
     * Graph function resolution (number of points to draw).
     */
    resolution: number;
    
    /**
     * The line style.
     */
    lineStyle: LineStyle;

    /**
     * The y(x) function to render.
     */
    function: string;

    /**
     * The breakDistance is an distance to break the graph in
     * two lines. This is used to prevent the draw graph in
     * breaks of limits in e.g. tan(x) and 1/x
     */
    breakDistance: number;

    /**
     * Function rendering domain start.
     */
    domainStart: number;
    /**
     * Function rendering domain end.
     */
    domainEnd: number;

    /**
     * Last computed points.
     */
    lastPoints: ({ x: number, y: number }[])[];

    private lastPointsNeedRecalc: boolean;
    private lastPointsBounding: RenderItemBounds;
    private lastViewTranslation: { x: number; y: number; };
    private lastViewZoom: { x: number; y: number; };

    constructor(opts?: FunctionItemCreateOptions) {
        this.name = '';
        this.resolution = 200;
        this.lineStyle = new LineStyle();
        this.function = '';
        this.breakDistance = 100;
        this.domainStart = Number.NEGATIVE_INFINITY;
        this.domainEnd = Number.POSITIVE_INFINITY;
        // utils
        this.lastPoints = [];
        // private
        this.lastPointsNeedRecalc = false;
        this.lastPointsBounding = { left: 0, right: 0, top: 0, bottom: 0};
        this.lastViewTranslation = { x: Number.NaN, y: Number.NaN };
        this.lastViewZoom = { x: Number.NaN, y: Number.NaN };
        applyProps(opts, this);
    }

    render(view: View): void {
        if (this.lineStyle.lineWidth <= 0 || this.function === '') {
            return;
        }
        this.lastPoints.forEach((points) => {
            view.context.beginPath();
            for (let i = 0; i < points.length; i += 1) {
                if (i === 0) {
                    view.context.moveTo(points[i].x, points[i].y);
                } else {
                    view.context.lineTo(points[i].x, points[i].y);
                }
            }
            this.lineStyle.applyTo(view.context);
            view.context.stroke();
        });
    }

    preBoundingCalculate(view: View): void {
        this.lastPointsNeedRecalc = false;
        if (isNaN(this.lastViewTranslation.x) || isNaN(this.lastViewTranslation.y)
            || isNaN(this.lastViewZoom.x) || isNaN(this.lastViewZoom.y)) {
            this.lastPointsNeedRecalc = true;
        }
        if (this.lastViewTranslation.x !== view.translation.x 
            || this.lastViewTranslation.y !== view.translation.y
            || this.lastViewZoom.x !== view.zoom.x
            || this.lastViewZoom.y !== view.zoom.y) {
            this.lastPointsNeedRecalc = true;
        }
    }

    getBounding(view: View): RenderItemBounds {
        if (!view.evaluate) {
            return { left : 0, right: 0, top: 0, bottom: 0 };
        }
        if (!this.lastPointsNeedRecalc) {
            return this.lastPointsBounding;
        }
        this.lastPointsBounding = { left: 0, top: 0, right: 0, bottom: 0 };
        if (this.lineStyle.lineWidth <= 0 || this.function === '') {
            return this.lastPointsBounding;
        }
        let left = view.translation.x;
        let right = left + view.canvas.width / view.zoom.x;
        if (isFinite(this.domainStart)
            && !isNaN(this.domainStart)
            && isFinite(this.domainStart)
            && !isNaN(this.domainStart)) {
            left = Math.min(this.domainStart, this.domainEnd);
            right = Math.max(this.domainStart, this.domainEnd);
        }
        // get the interval size
        const interval = (right - left) / this.resolution;
        let x = left;
        // for the breakpoint
        let lastX = x;
        let lastY = 0;
        let points: { x: number, y: number }[] = [];
        this.lastPoints = [];
        for (let i = 0; i <= this.resolution; i += 1) {
            let y = 0;
            try {
                y = view.evaluate(this.function, x);
            } catch (e) {
                continue;
            }
            // break point check
            if (i !== 0) {
                // euclidian distance between two points
                const dist = Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2);
                const epsilon = Math.pow(this.breakDistance, 2);
                if (dist >= epsilon) {
                    this.lastPoints.push(points);
                    points = [];
                }
            }

            const { x: displayX, y: displayY } = view.spacePointToCanvas(x, y);
            points.push({ x: displayX, y: displayY });
            lastX = x;
            lastY = y;
            x += interval;
        }
        if (points.length > 0) {
            this.lastPoints.push(points);
        }
        let boundingLeft = 0;
        let boundingTop = 0;
        let boundingRight = 0;
        let boundingBottom = 0;
        this.lastPoints.forEach((pointArray) => {
            pointArray.forEach((point) => {
                boundingLeft = Math.min(boundingLeft, point.x);
                boundingRight = Math.max(boundingRight, point.x);
                boundingTop = Math.min(boundingTop, point.y);
                boundingBottom = Math.max(boundingBottom, point.y);
            });
        });
        this.lastPointsBounding = {
            left: boundingLeft,
            top: boundingTop,
            right: boundingRight,
            bottom: boundingBottom
        };
        this.lastViewTranslation = view.translation;
        this.lastViewZoom = view.zoom;
        this.lastPointsNeedRecalc = false;
        return this.lastPointsBounding;
    }

    updateFunction(func?: string): void {
        if (func !== undefined) {
            this.function = func;
        }
        this.lastViewTranslation = { x: Number.NaN, y: Number.NaN };
        this.lastViewZoom = { x: Number.NaN, y: Number.NaN };
    }

    getSerializationId(): string {
        return 'function';
    }

    static deserialize(data: FunctionItemCreateOptions): RenderItem {
        return new FunctionItem({
            ...data,
            domainStart: data.domainStart === null ? undefined : data.domainStart,
            domainEnd: data.domainEnd === null ? undefined : data.domainEnd,
        });
    }

    static serialize(item: FunctionItem): FunctionItemCreateOptions {
        return {
            name: item.name,
            resolution: item.resolution,
            lineStyle: item.lineStyle.serialize(),
            function: item.function,
            breakDistance: item.breakDistance,
            domainStart: item.domainStart,
            domainEnd: item.domainEnd,
        };
    }

    getPoint(view: View, options: FunctionItemCapturePointOptions): {
        x: number;
        y: number;
    } {
        if (!view.evaluate) {
            return { x: 0, y: 0 };
        }
        try {
            const fx = view.evaluate(this.function, options.x);
            return {
                x: options.x + (options.xPadding !== undefined ? options.xPadding : 0),
                y: fx + (options.yPadding !== undefined ? options.yPadding : 0)
            };
        } catch(err) {
            return { x: 0, y: 0 };
        }
    }
}
