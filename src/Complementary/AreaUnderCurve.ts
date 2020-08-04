import { evaluate } from 'mathjs';
import { View } from '../View';
import { RenderItem, RenderItemBounds } from '../Items/RenderItem';
import { Function } from '../Items/Function';
import { overlapBoundings } from '../Utils/bounding';

export interface AreaUnderCurveCreateOptions {
    /**
     * The RenderItem name.
     */
    name?: string;
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
    fillStyle?: string;
    /**
     * A boolean value indicating if the area is stroked.
     */
    stroke?: boolean;
    /**
     * The stroke style for the area.
     */
    strokeStyle?: string;
    /**
     * The stroke width for the area.
     */
    strokeWidth?: number;
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
    fillStyle: string;
    /**
     * A boolean value indicating if the area is stroked.
     */
    stroke: boolean;
    /**
     * The stroke style for the area.
     */
    strokeStyle: string;
    /**
     * The stroke width for the area.
     */
    strokeWidth: number;

    polygon: { x: number; y: number; }[];

    constructor(opts?: AreaUnderCurveCreateOptions) {
        this.name = '';
        this.curveName = '';
        this.left = 0;
        this.right = 0;
        this.fill = true;
        this.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.stroke = false;
        this.strokeStyle = 'black';
        this.strokeWidth = 1;
        this.polygon = [];

        if (opts) {
            if (opts.name !== null && opts.name !== undefined) {
                this.name = opts.name;
            }
            if (opts.curveName !== null && opts.curveName !== undefined) {
                this.curveName = opts.curveName;
            }
            if (opts.left !== null && opts.left !== undefined) {
                this.left = opts.left;
            }
            if (opts.right !== null && opts.right !== undefined) {
                this.right = opts.right;
            }
            if (opts.fill !== null && opts.fill !== undefined) {
                this.fill = opts.fill;
            }
            if (opts.fillStyle !== null && opts.fillStyle !== undefined) {
                this.fillStyle = opts.fillStyle;
            }
            if (opts.stroke !== null && opts.stroke !== undefined) {
                this.stroke = opts.stroke;
            }
            if (opts.strokeStyle !== null && opts.strokeStyle !== undefined) {
                this.strokeStyle = opts.strokeStyle;
            }
            if (opts.strokeWidth !== null && opts.strokeWidth !== undefined) {
                this.strokeWidth = opts.strokeWidth;
            }
        }
    }

    getRelativeResolution(view: View, width: number, func: Function): number {
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
            view.context.fillStyle = this.fillStyle;
            view.context.fill();
        }
        if (this.stroke) {
            view.context.strokeStyle = this.strokeStyle;
            view.context.lineWidth = this.strokeWidth;
            view.context.stroke();
        }
    }

    getBounding(view: View): RenderItemBounds {
        const empty = { left: 0, right: 0, top: 0, bottom: 0 };
        if (this.curveName === '') {
            return empty;
        }
        if (this.left === this.right) {
            return empty;
        }
        if (!this.fill && !this.stroke) {
            return empty;
        }
        const curve = view.getItemByName(this.curveName);
        const pointA = view.spacePointToCanvas(Math.min(this.left, this.right), 0);
        const pointB = view.spacePointToCanvas(Math.max(this.right, this.left), 0);
        if (curve instanceof Function) {
            const bb1 = curve.getBounding(view);
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
                const pt = view.spacePointToCanvas(x, evaluate(curve.function, { x }));
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
        }
        // other items is not supported for now
        return empty;
    }
}
