import { RenderItem, RenderItemCreateOptions, RenderItemBounds } from '../Base/RenderItem';
import { View } from '../View';
import { applyProps } from '../Utils/props';
import { LineStyle, LineStyleOptions } from '../Style/LineStyle';
import { FillStyle } from '../Style/FillStyle';
import { FillStyleOptions } from '../Style/FillStyleOptions';
import { SolidFill } from '../Style/SolidFill';

/**
 * Options for point creation.
 */
export interface PointCreateOptions extends RenderItemCreateOptions {
    /**
     * x position of the point.
     */
    x?: number;
    /**
     * y position of the point.
     */
    y?: number;
    /**
     * the fill style of the point.
     */
    fillStyle?: FillStyleOptions;
    /**
     * a boolean value indicating if the point is stroked.
     */
    stroke?: boolean;
    /**
     * the stroke style of the point.
     */
    strokeStyle?: LineStyleOptions;
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
     * the fill style of the point.
     */
    fillStyle: FillStyle;

    /**
     * a boolean value indicating if the point is stroked.
     */
    stroke: boolean;

    /**
     * the stroke style of the point.
     */
    strokeStyle: LineStyle;

    /**
     * the size of the point.
     */
    pointSize: number;

    constructor(opts?: PointCreateOptions) {
        this.name = '';
        this.x = 0;
        this.y = 0;
        this.fillStyle = new SolidFill();
        this.stroke = false;
        this.strokeStyle = new LineStyle();
        this.pointSize = 5;

        applyProps(opts, this);
    }
    
    render(view: View): void {
        if (this.pointSize <= 0) {
            return;
        }
        const { x : px, y: py } = view.spacePointToCanvas(this.x, this.y);
        this.fillStyle.applyTo(view.context);
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
        if (this.stroke && this.strokeStyle.lineWidth > 0) {
            this.strokeStyle.applyTo(view.context);
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

    getSerializationId(): string {
        return 'point';
    }

    static deserialize(data: PointCreateOptions): RenderItem {
        return new Point(data);
    }

    static serialize(item: Point): PointCreateOptions {
        return {
            name: item.name,
            x: item.x,
            y: item.y,
            fillStyle: item.fillStyle.serialize(),
            stroke: item.stroke,
            strokeStyle: item.strokeStyle.serialize(),
            pointSize: item.pointSize,
        };
    }
}
