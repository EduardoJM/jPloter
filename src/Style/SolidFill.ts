import { FillStyle } from './FillStyle';
import { Color } from './Color';
import { applyProps } from '../Utils/props';
import { FillStyleOptions } from './FillStyleOptions';

export interface SolidFillOptions {
    color?: string;
    opacity?: number;
}

export class SolidFill extends FillStyle {
    color: Color;

    opacity: number;

    constructor(opts?: SolidFillOptions) {
        super();

        this.color = new Color();
        this.opacity = 1;

        applyProps(opts, this);
    }

    applyTo(context: CanvasRenderingContext2D): void {
        const { r, g, b } = this.color;
        this.opacity = Math.min(1, Math.max(0, this.opacity));
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }

    serialize(): FillStyleOptions {
        return {
            type: 'solid',
            color: this.color.toString(),
            opacity: this.opacity
        };
    }
}
