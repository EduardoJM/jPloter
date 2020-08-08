import { FillStyle } from './FillStyle';
import { Color } from './Color';
import { applyProps } from '../Utils/props';

export interface SolidFillOptions {
    color?: string;
}

export class SolidFill extends FillStyle {
    color: Color;

    constructor(opts?: SolidFillOptions) {
        super();

        this.color = new Color();

        applyProps(opts, this);
    }

    applyTo(context: CanvasRenderingContext2D): void {
        const { r, g, b } = this.color;
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    }
}
