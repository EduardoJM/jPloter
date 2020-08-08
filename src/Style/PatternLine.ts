import { FillStyle } from './FillStyle';
import { LineStyle, LineStyleOptions } from './LineStyle';
import { Color } from './Color';
import { applyProps } from '../Utils/props';

export interface PatternLineOptions {
    lineStyle?: LineStyleOptions;
    patternSize?: number;
    baseColor?: string;
    opacity?: number;
}

export class PatternLine extends FillStyle {
    lineStyle: LineStyle;

    baseColor: Color;

    patternSize: number;

    opacity: number;

    private patternCanvas: HTMLCanvasElement | null;
    private pattern: CanvasPattern | null;

    constructor(opts?: PatternLineOptions) {
        super();

        this.lineStyle = new LineStyle();
        this.patternSize = 32;
        this.baseColor = new Color();
        this.opacity = 1;

        this.patternCanvas = null;
        this.pattern = null;

        applyProps(opts, this);
    }
    
    updatePattern(): HTMLCanvasElement | null {
        const canvas = document.createElement('canvas');
        canvas.width = this.patternSize;
        canvas.height = this.patternSize;
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            this.patternCanvas = null;
            this.pattern = null;
            return null;
        }
        const { r, g, b } = this.baseColor;
        this.opacity = Math.min(1, Math.max(0, this.opacity));
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.fillRect(0, 0, this.patternSize, this.patternSize);
        
        this.lineStyle.opacity = this.opacity;
        this.lineStyle.applyTo(ctx);
        ctx.beginPath();
        ctx.moveTo(-this.patternSize, 2 * this.patternSize);
        ctx.lineTo(2 * this.patternSize, -this.patternSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-2 * this.patternSize, 2 * this.patternSize);
        ctx.lineTo(this.patternSize, -this.patternSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 2 * this.patternSize);
        ctx.lineTo(3 * this.patternSize, -this.patternSize);
        ctx.stroke();

        this.pattern = null;
        this.patternCanvas = canvas;
        return canvas;
    }

    applyTo(context: CanvasRenderingContext2D): void {
        if (this.pattern) {
            context.fillStyle = this.pattern;
        }
        let canvas = this.patternCanvas;
        if (!canvas) {
            canvas = this.updatePattern();
        }
        if (!canvas) {
            return;
        }
        this.pattern = context.createPattern(canvas, 'repeat');
        if (this.pattern) {
            context.fillStyle = this.pattern;
        }
    }
}
