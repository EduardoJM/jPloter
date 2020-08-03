import { RenderItem, RenderItemBounds } from './RenderItem';
import { View } from '../View';
import { evaluate } from 'mathjs';

export interface FunctionCreateOptions {
    /**
     * Graph function resolution (number of points to draw).
     */
    resolution?: number;
    /**
     * Graph line color.
     */
    color?: string;
    /**
     * Graph line width.
     */
    lineWidth?: number;
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
}

export class Function implements RenderItem {
    /**
     * Graph function resolution (number of points to draw).
     */
    resolution: number;
    
    /**
     * Graph line color.
     */
    color: string;

    /**
     * Graph line width.
     */
    lineWidth: number;

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

    lastPoints: ({ x: number, y: number }[])[];

    constructor(opts?: FunctionCreateOptions) {
        this.resolution = 200;
        this.color = 'black';
        this.lineWidth = 1;
        this.function = '';
        this.breakDistance = 100;
        this.lastPoints = [];

        if (opts) {
            if (opts.resolution !== null && opts.resolution !== undefined) {
                this.resolution = opts.resolution;
            }
            if (opts.color !== null && opts.color !== undefined) {
                this.color = opts.color;
            }
            if (opts.lineWidth !== null && opts.lineWidth !== undefined) {
                this.lineWidth = opts.lineWidth;
            }
            if (opts.function !== null && opts.function !== undefined) {
                this.function = opts.function;
            }
            if (opts.breakDistance !== null && opts.breakDistance !== undefined) {
                this.breakDistance = opts.breakDistance;
            }
        }
    }

    render(view: View) {
        if (this.lineWidth <= 0 || this.function === '') {
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
            view.context.strokeStyle = this.color;
            view.context.lineWidth = this.lineWidth;
            view.context.stroke();
        });
    }

    getBounding(view: View): RenderItemBounds {
        const empty = { left: 0, top: 0, right: 0, bottom: 0 };
        if (this.lineWidth <= 0 || this.function === '') {
            return empty;
        }
        const left = view.translation.x;
        const right = left + view.canvas.width / view.zoom.x;
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
                y = evaluate(this.function, { x });
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
        return {
            left: boundingLeft,
            top: boundingTop,
            right: boundingRight,
            bottom: boundingBottom
        };
    }
};

