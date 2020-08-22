import { View } from '../View';
import { RenderItem, RenderItemCreateOptions, RenderItemBounds } from '../Base/RenderItem';
import { FunctionItem } from './FunctionItem';
import { LineSegment } from '../Geometry/LineSegment';
import { overlapBoundings } from '../Utils/bounding';
import { applyProps } from '../Utils/props';
import { LineStyleOptions, LineStyle } from '../Style/LineStyle';
import { FillStyle } from '../Style/FillStyle';
import { FillStyleOptions } from '../Style/FillStyleOptions';
import { SolidFill } from '../Style/SolidFill';

export interface AreaUnderCurveCreateOptions extends RenderItemCreateOptions {
    /**
     * The curve name to fill the area under it.
     */
    curveName?: string;
    /**
     * The left interval for draw area under curve.
     */
    left?: number;
    /**
     * The right interval for draw area under curve.
     */
    right?: number;
    /**
     * A boolean value indicating if the area is filled.
     */
    fill?: boolean;
    /**
     * The fill style for area.
     */
    fillStyle?: FillStyleOptions;
    /**
     * A boolean value indicating if the area is stroked.
     */
    stroke?: boolean;
    /**
     * The stroke style for the area.
     */
    strokeStyle?: LineStyleOptions;
}

export class AreaUnderCurve implements RenderItem {
    /**
     * The RenderItem name.
     */
    name: string;
    /**
     * The curve name to fill the area under it.
     */
    curveName: string;
    /**
     * The left interval for draw area under curve.
     */
    left: number;
    /**
     * The right interval for draw area under curve.
     */
    right: number;
    /**
     * A boolean value indicating if the area is filled.
     */
    fill: boolean;
    /**
     * The fill style for area.
     */
    fillStyle: FillStyle;
    /**
     * A boolean value indicating if the area is stroked.
     */
    stroke: boolean;
    /**
     * The stroke style for the area.
     */
    strokeStyle: LineStyle;

    polygon: { x: number; y: number; }[];

    constructor(opts?: AreaUnderCurveCreateOptions) {
        this.name = '';
        this.curveName = '';
        this.left = 0;
        this.right = 0;
        this.fill = true;
        this.fillStyle = new SolidFill();
        this.stroke = false;
        this.strokeStyle = new LineStyle();
        this.polygon = [];

        applyProps(opts, this);
    }

    getRelativeResolution(view: View, width: number, func: FunctionItem): number {
        const left = view.translation.x;
        const right = left + view.canvas.width / view.zoom.x;
        return Math.round((func.resolution * width) / (right - left));
    }

    render(view: View): void {
        view.context.beginPath();
        this.polygon.forEach((point, index) => {
            if (index === 0) {
                view.context.moveTo(point.x, point.y);
            } else {
                view.context.lineTo(point.x, point.y);
            }
        });
        view.context.closePath();
        if (this.fill) {
            this.fillStyle.applyTo(view.context);
            view.context.fill();
        }
        if (this.stroke) {
            this.strokeStyle.applyTo(view.context);
            view.context.stroke();
        }
    }

    getBounding(view: View): RenderItemBounds {
        const empty = { left: 0, right: 0, top: 0, bottom: 0 };
        if (!view.evaluate
            || this.curveName === ''
            || (this.left === this.right)
            || (!this.fill && !this.stroke)) {
            return empty;
        }
        const curve = view.getItemByName(this.curveName);
        const pointA = view.spacePointToCanvas(Math.min(this.left, this.right), 0);
        const pointB = view.spacePointToCanvas(Math.max(this.right, this.left), 0);
        if (curve instanceof FunctionItem) {
            const bb1 = curve.getBounding(view);
            if (bb1.left === bb1.right || bb1.top === bb1.bottom) {
                return empty;
            }
            const bb2 = { left: pointA.x, right: pointB.x, top: bb1.top, bottom: bb1.bottom };
            if (!overlapBoundings(bb1, bb2)) {
                return empty;
            }
            // function calculation
            const left = Math.min(this.left, this.right);
            const right = Math.max(this.right, this.left);
            const resolution = this.getRelativeResolution(view, right - left, curve);
            const space = (right - left) / resolution;
            let x = left;
            // reset polygon
            this.polygon = [];
            // bounding calculation
            let minY = 0;
            let maxY = 0;
            for (let i = 0; i <= resolution; i += 1) {
                let y = 0;
                try {
                    y = view.evaluate(curve.function, x);
                } catch (e) {
                    continue;
                }
                const pt = view.spacePointToCanvas(x, y);
                minY = Math.min(pt.y, minY);
                maxY = Math.max(pt.y, maxY);
                this.polygon.push(pt);

                x += space;
            }
            if (this.polygon.length > 3) {
                this.polygon.push({
                    x: this.polygon[this.polygon.length - 1].x,
                    y: pointA.y
                });
                this.polygon.push({
                    x: this.polygon[0].x,
                    y: pointA.y
                });
            }
            return {
                left: bb2.left,
                right: bb2.right,
                top: minY,
                bottom: maxY
            };
        } else if (curve instanceof LineSegment) {
            curve.getBounding(view);
            if (!curve.firstPoint || !curve.secondPoint) {
                console.log('not points');
                return empty;
            }
            const areaLeft = Math.min(this.left, this.right);
            const areaRight = Math.max(this.right, this.left);
            const lineLeft = Math.min(curve.firstPoint.x, curve.secondPoint.x);
            const lineRight = Math.max(curve.firstPoint.x, curve.secondPoint.x);
            let left = areaLeft;
            if (areaLeft < lineLeft) {
                left = lineLeft;
            }
            let right = areaRight;
            if (areaRight > lineRight) {
                right = lineRight;
            }
            if (lineRight === lineLeft) {
                // not draw area under a vertical line.
                return empty;
            }
            const yMax = Math.max(curve.firstPoint.y, curve.secondPoint.y);
            const yMin = Math.min(curve.firstPoint.y, curve.secondPoint.y);
            const a = (yMax - yMin) / (lineRight - lineLeft);
            const b = curve.firstPoint.y - a * curve.firstPoint.x;
            // linear function
            // y = ax + b
            // a * curve.firstPoint.x + b = curve.firstPoint.y
            // y_1 = left * a + b
            // y_2 = right * a + b
            const leftY = left * a + b;
            const rightY = right * a + b;
            const pt1 = view.spacePointToCanvas(left, leftY);
            const pt2 = view.spacePointToCanvas(right, rightY);
            this.polygon = [
                { x: pt1.x, y: pointA.y },
                pt1,
                pt2,
                { x: pt2.x, y: pointA.y },
            ];
            return {
                left: pt1.x,
                right: pt2.x,
                top: Math.min(pointA.y, pt1.y, pt2.y),
                bottom: Math.max(pointA.y, pt1.y, pt2.y)
            };
        }
        // other items is not supported for now
        return empty;
    }

    getSerializationId(): string {
        return 'areaUnderCurve';
    }

    static deserialize(data: AreaUnderCurveCreateOptions): RenderItem {
        return new AreaUnderCurve(data);
    }

    static serialize(item: AreaUnderCurve): AreaUnderCurveCreateOptions {
        return {
            name: item.name,
            curveName: item.curveName,
            left: item.left,
            right: item.right,
            fill: item.fill,
            fillStyle: item.fillStyle.serialize(),
            stroke: item.stroke,
            strokeStyle: item.strokeStyle.serialize(),
        };
    }
}
