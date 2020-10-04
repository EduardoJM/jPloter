import { RenderItem, RenderItemCreateOptions, RenderItemBounds } from '../Base/RenderItem';
import { View } from '../View';
import { applyProps } from '../Utils/props';
import { LineStyle, LineStyleOptions } from '../Style/LineStyle';
import { FillStyle } from '../Style/FillStyle';
import { FillStyleOptions } from '../Style/FillStyleOptions';
import { Point } from './Point';
import { SolidFill } from '../Style/SolidFill';

/**
 * Options for circle creation.
 */
export interface CircleCreateOptions extends RenderItemCreateOptions {
    centerPointName?: string;

    radius?: number;

    stroke?: boolean;

    strokeStyle?: LineStyleOptions;

    fill?: boolean;

    fillStyle?: FillStyleOptions;
}

export class Circle implements RenderItem {
    name: string;

    centerPointName: string;

    radius: number;

    stroke: boolean;

    strokeStyle: LineStyle;

    fill: boolean;

    fillStyle: FillStyle;

    centerPoint: Point | null;

    constructor(opts?: CircleCreateOptions) {
        this.name = '';
        this.centerPointName = '';
        this.radius = 1;
        this.stroke = true;
        this.strokeStyle = new LineStyle();
        this.fill = false;
        this.fillStyle = new SolidFill();

        this.centerPoint = null;

        applyProps(opts, this);
    }

    getBounding(view: View): RenderItemBounds {
        const empty = { left: 0, top: 0, right: 0, bottom: 0 };
        const pointA = view.getItemByName(this.centerPointName);
        if (!pointA || !(pointA instanceof Point)) {
            this.centerPoint = null;
            return empty;
        }
        this.centerPoint = pointA;
        const p1 = view.spacePointToCanvas(pointA.x - this.radius, pointA.y - this.radius);
        const p2 = view.spacePointToCanvas(pointA.x + this.radius, pointA.y + this.radius);
        return {
            left: Math.min(p1.x, p2.x),
            right: Math.max(p1.x, p2.x),
            top: Math.min(p1.y, p2.y),
            bottom: Math.max(p1.y, p2.y)
        };
    }

    getSerializationId(): string {
        return 'circle';
    }

    render(view: View): void {
        if (!this.centerPoint) {
            return;
        }
        const p1 = view.spacePointToCanvas(this.centerPoint.x, this.centerPoint.y);
        const p2 = view.spacePointToCanvas(this.centerPoint.x + this.radius, 0);
        const canvasRadius = p2.x - p1.x;
        view.context.beginPath();
        view.context.arc (p1.x, p1.y, canvasRadius, 0, 2 * Math.PI, false);
        if (this.fill) {
            this.fillStyle.applyTo(view.context);
            view.context.fill();
        }
        if (this.stroke) {
            this.strokeStyle.applyTo(view.context);
            view.context.stroke();
        }
    }
}
