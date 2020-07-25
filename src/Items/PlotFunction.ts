import RenderItem from './RenderItem';
import View from '../View';
import { evaluate } from 'mathjs';

export interface FunctionCreateOptions {
    resolution?: number;
    color?: string;
    lineWidth?: number;
    function?: string;
}

export default class Function implements RenderItem {
    resolution: number;
    
    color: string;

    lineWidth: number;

    function: string;

    constructor(opts?: FunctionCreateOptions) {
        this.resolution = 200;
        this.color = 'black';
        this.lineWidth = 1;
        this.function = '';

        if (opts) {
            if (opts.resolution !== null && opts.resolution !== undefined) {
                this.resolution = opts.resolution;
            }
            if (opts.color !== null && opts.color !== undefined) {
                this.color = opts.color;
            }
            if (opts.lineWidth !== null && opts.lineWidth !== undefined) {
                this.lineWidth = opts.lineWidth;
            }
            if (opts.function !== null && opts.function !== undefined) {
                this.function = opts.function;
            }
        }
    }

    render(view: View) {
        if (this.lineWidth <= 0 || this.function === '') {
            return;
        }
        // get the space left position
        const left = view.translation.x;
        // get the space right position
        const { x: width } = view.canvasPointToSpace(
            view.canvas.width,
            view.canvas.height
        );
        const right = left + width;
        // get the interval size
        const interval = (right - left) / this.resolution;
        // begin the path
        view.context.beginPath();
        let x = left;
        for (let i = 0; i < this.resolution; i += 1) {
            let y = 0;
            try {
                y = evaluate(this.function, { x });
            } catch (e) {
                continue;
            }

            const displayX = x * view.zoom.x;
            const displayY = y * view.zoom.y;

            if (i === 0) {
                view.context.moveTo(displayX, displayY)
            } else {
                view.context.lineTo(displayX, displayY)
            }

            x += interval;
        }
        view.context.strokeStyle = this.color;
        const lw = view.context.lineWidth;
        view.context.lineWidth = this.lineWidth;
        view.context.stroke();
        view.context.lineWidth = lw;
    }
};

