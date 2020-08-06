import { Color } from './Color';
import { View } from './View';
import { applyProps } from './Utils/props';

export type LineStyleType = 'dash' | 'solid';

export type LineStyleCap = 'butt' | 'square' | 'round';

export type LineStyleJoin = 'round' | 'bevel' | 'miter';

export interface LineStyleOptions {
    color: string;
    opacity: number;
    type: LineStyleType;
    lineWidth: number;
    lineCap: LineStyleCap;
    lineJoin: LineStyleJoin;
    miterLimit: number;
    dashSize: number;
    dashDistance: number;
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
        this.opacity = Math.min(1, Math.max(0, this.opacity));
        const { r, g, b } = this.color;
        return `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }

    applyTo(view: View) {
        view.context.strokeStyle = this.getContextStyle();
        view.context.lineWidth = this.lineWidth;
        view.context.lineCap = this.lineCap;
        view.context.lineJoin = this.lineJoin;
        view.context.miterLimit = this.miterLimit;
        if (this.type === 'dash') {
            view.context.setLineDash([this.dashSize, this.dashDistance]);
        } else {
            view.context.setLineDash([]);
        }
    }
}
