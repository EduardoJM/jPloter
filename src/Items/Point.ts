import { RenderItem, RenderItemBounds } from './RenderItem';
import { View } from '../View';

/**
 * Options for point creation.
 */
export interface PointCreateOptions {
    /**
     * x position of the point.
     */
    x?: number;
    /**
     * y position of the point.
     */
    y?: number;
    /**
     * the fill color of the point.
     */
    color?: string;
    /**
     * a boolean value indicating if the point is stroked.
     */
    stroke?: boolean;
    /**
     * the stroke color of the point.
     */
    strokeColor?: string;
    /**
     * the stroke width of the point.
     */
    strokeWidth?: number;
    /**
     * the size of the point.
     */
    pointSize?: number;
}

/**
 * A class implementating an Point RenderItem.
 */
export class Point implements RenderItem {
    /**
     * name of the item.
     */
    name: string;

    /**
     * x position of the point.
     */
    x: number;

    /**
     * y position of the point.
     */
    y: number;

    /**
     * a boolean value indicating if the point is stroked.
     */
    color: string;

    /**
     * a boolean value indicating if the point is stroked.
     */
    stroke: boolean;

    /**
     * the stroke color of the point.
     */
    strokeColor: string;

    /**
     * the stroke width of the point.
     */
    strokeWidth: number;

    /**
     * the size of the point.
     */
    pointSize: number;

    constructor(opts?: PointCreateOptions) {
        this.name = '';
        this.x = 0;
        this.y = 0;
        this.color = 'black';
        this.stroke = false;
        this.strokeColor = 'black';
        this.strokeWidth = 1;
        this.pointSize = 5;

        if (opts) {
            if (opts.x !== null && opts.x !== undefined) {
                this.x = opts.x;
            }
            if (opts.y !== null && opts.y !== undefined) {
                this.y = opts.y;
            }
            if (opts.color !== null && opts.color !== undefined) {
                this.color = opts.color;
            }
            if (opts.stroke !== null && opts.stroke !== undefined) {
                this.stroke = opts.stroke;
            }
            if (opts.strokeColor !== null && opts.strokeColor !== undefined) {
                this.strokeColor = opts.strokeColor;
            }
            if (opts.strokeWidth !== null && opts.strokeWidth !== undefined) {
                this.strokeWidth = opts.strokeWidth;
            }
            if (opts.pointSize !== null && opts.pointSize !== undefined) {
                this.pointSize = opts.pointSize;
            }
        }
    }
    
    render(view: View) {
        if (this.pointSize <= 0) {
            return;
        }
        const { x : px, y: py } = view.spacePointToCanvas(this.x, this.y);
        view.context.fillStyle = this.color;
        view.context.beginPath();
        view.context.arc(
            px,
            py,
            this.pointSize,
            0,
            2 * Math.PI,
            false
        );
        view.context.fill();
        if (this.stroke && this.strokeWidth > 0) {
            view.context.strokeStyle = this.strokeColor;
            view.context.lineWidth = this.strokeWidth;
            view.context.stroke();
        }
    }

    getBounding(view: View): RenderItemBounds {
        const empty = { left: 0, top: 0, right: 0, bottom: 0 };
        if (this.pointSize <= 0) {
            return empty;
        }
        const { x : px, y: py } = view.spacePointToCanvas(this.x, this.y);
        return {
            left: px - this.pointSize,
            top: py - this.pointSize,
            right: px + this.pointSize,
            bottom: py + this.pointSize
        };
    }
}
