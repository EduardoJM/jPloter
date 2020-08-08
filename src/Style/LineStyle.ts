import { Color } from './Color';
import { applyProps } from '../Utils/props';

export type LineStyleType = 'dash' | 'solid';

export type LineStyleCap = 'butt' | 'square' | 'round';

export type LineStyleJoin = 'round' | 'bevel' | 'miter';

export interface LineStyleOptions {
    color?: string;
    opacity?: number;
    type?: LineStyleType;
    lineWidth?: number;
    lineCap?: LineStyleCap;
    lineJoin?: LineStyleJoin;
    miterLimit?: number;
    dashSize?: number;
    dashDistance?: number;
}

export class LineStyle {
    color: Color;

    opacity: number;

    type: LineStyleType;

    lineWidth: number;

    lineCap: LineStyleCap;

    lineJoin: LineStyleJoin;

    miterLimit: number;

    dashSize: number;

    dashDistance: number;

    constructor(opts?: LineStyleOptions) {
        this.color = new Color();
        this.opacity = 1;
        this.type = 'solid';
        this.lineWidth = 1;
        this.lineCap = 'butt';
        this.lineJoin = 'miter';
        this.miterLimit = 10;
        this.dashSize = 10;
        this.dashDistance = 10;

        applyProps(opts, this);
    }

    getContextStyle() {
        const { r, g, b } = this.color;
        this.opacity = Math.min(1, Math.max(0, this.opacity));
        return `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }

    applyTo(context: CanvasRenderingContext2D) {
        context.strokeStyle = this.getContextStyle();
        context.lineWidth = this.lineWidth;
        context.lineCap = this.lineCap;
        context.lineJoin = this.lineJoin;
        context.miterLimit = this.miterLimit;
        if (this.type === 'dash') {
            context.setLineDash([this.dashSize, this.dashDistance]);
        } else {
            context.setLineDash([]);
        }
    }
}
