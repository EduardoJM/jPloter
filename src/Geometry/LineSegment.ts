import { RenderItem, RenderItemCreateOptions, RenderItemBounds } from '../Base/RenderItem';
import { View } from '../View';
import { applyProps } from '../Utils/props';
import { LineStyle, LineStyleOptions } from '../Style/LineStyle';
import { Point } from './Point';

/**
 * Options for line segment creation.
 */
export interface LineSegmentCreateOptions extends RenderItemCreateOptions {
    firstPointName?: string;

    secondPointName?: string;

    stroke?: boolean;

    strokeStyle?: LineStyleOptions;
}

export class LineSegment implements RenderItem {
    name: string;

    firstPointName: string;

    secondPointName: string;

    stroke: boolean;

    strokeStyle: LineStyle;

    firstPoint: Point | null;

    secondPoint: Point | null;

    constructor(opts?: LineSegmentCreateOptions) {
        this.name = '';
        this.firstPointName = '';
        this.secondPointName = '';
        this.stroke = true;
        this.strokeStyle = new LineStyle();

        this.firstPoint = null;
        this.secondPoint = null;

        applyProps(opts, this);
    }

    getBounding(view: View): RenderItemBounds {
        const empty = { left: 0, top: 0, right: 0, bottom: 0 };
        const pointA = view.getItemByName(this.firstPointName);
        const pointB = view.getItemByName(this.secondPointName);
        if (!pointA || !pointB || !(pointA instanceof Point) || !(pointB instanceof Point)) {
            this.firstPoint = null;
            this.secondPoint = null;
            return empty;
        }
        this.firstPoint = pointA;
        this.secondPoint = pointB;
        const p1 = view.spacePointToCanvas(pointA.x, pointA.y);
        const p2 = view.spacePointToCanvas(pointB.x, pointB.y);
        return {
            left: Math.min(p1.x, p2.x),
            right: Math.max(p1.x, p2.x),
            top: Math.min(p1.y, p2.y),
            bottom: Math.max(p1.y, p2.y)
        };
    }

    render(view: View): void {
        if (!this.stroke || !this.firstPoint || !this.secondPoint) {
            return;
        }
        const { x: firstX, y: firstY } = this.firstPoint.getPointCoords(view);
        const { x: secondX, y: secondY } = this.secondPoint.getPointCoords(view);
        const p1 = view.spacePointToCanvas(firstX, firstY);
        const p2 = view.spacePointToCanvas(secondX, secondY);
        view.context.beginPath();
        view.context.moveTo(p1.x, p1.y);
        view.context.lineTo(p2.x, p2.y);
        this.strokeStyle.applyTo(view.context);
        view.context.stroke();
    }

    getSerializationId(): string {
        return 'lineSegment';
    }

    static deserialize(data: LineSegmentCreateOptions): RenderItem {
        return new LineSegment(data);
    }

    static serialize(item: LineSegment): LineSegmentCreateOptions {
        return {
            name: item.name,
            firstPointName: item.firstPointName,
            secondPointName: item.secondPointName,
            stroke: item.stroke,
            strokeStyle: item.strokeStyle.serialize(),
        };
    }
}
