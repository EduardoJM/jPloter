import RenderItem from './RenderItem';
import View from '../View';

export interface AxisCreateOptions {
    xAxis?: boolean;
    xAxisWidth?: number;
    xAxisColor?: string;
    yAxis?: boolean;
    yAxisWidth?: number;
    yAxisColor?: string;
    arrows?: boolean;
    arrowSize?: number;
}

export default class Axis implements RenderItem {
    xAxis: boolean;

    xAxisWidth: number;

    xAxisColor: string;

    yAxis: boolean;

    yAxisWidth: number;

    yAxisColor: string;

    arrows: boolean;

    arrowSize: number;

    constructor(opts?: AxisCreateOptions) {
        this.xAxis = true;
        this.xAxisWidth = 2;
        this.xAxisColor = 'black';
        this.yAxis = true;
        this.yAxisWidth = 2;
        this.yAxisColor = 'black';
        this.arrows = true;
        this.arrowSize = 10;

        if (opts) {
            if (opts.xAxis !== null && opts.xAxis !== undefined) {
                this.xAxis = opts.xAxis;
            }
            if (opts.xAxisWidth !== null && opts.xAxisWidth !== undefined) {
                this.xAxisWidth = opts.xAxisWidth;
            }
            if (opts.xAxisColor !== null && opts.xAxisColor !== undefined) {
                this.xAxisColor = opts.xAxisColor;
            }
            if (opts.yAxis !== null && opts.yAxis !== undefined) {
                this.yAxis = opts.yAxis;
            }
            if (opts.yAxisWidth !== null && opts.yAxisWidth !== undefined) {
                this.yAxisWidth = opts.yAxisWidth;
            }
            if (opts.yAxisColor !== null && opts.yAxisColor !== undefined) {
                this.yAxisColor = opts.yAxisColor;
            }
            if (opts.arrows !== null && opts.arrows !== undefined) {
                this.arrows = opts.arrows;
            }
            if (opts.arrowSize !== null && opts.arrowSize !== undefined) {
                this.arrowSize = opts.arrowSize;
            }
        }
    }

    render(view: View) {
        const { x: left, y: top }
            = view.spacePointToCanvas(view.translation.x, -view.translation.y);
        const right = left + view.canvas.width;
        const bottom = top - view.canvas.height;

        if (this.xAxis) {
            // x axis
            view.context.beginPath();
            view.context.moveTo(left, 0);
            view.context.lineTo(right, 0);
            view.context.strokeStyle = this.xAxisColor;
            const lw = view.context.lineWidth;
            view.context.lineWidth = this.xAxisWidth;
            view.context.stroke();
            view.context.lineWidth = lw;
            
            if (this.arrows) {
                view.context.beginPath();
                view.context.moveTo(
                    right - this.arrowSize,
                    -this.arrowSize / 2
                );
                view.context.lineTo(
                    right - this.arrowSize,
                    this.arrowSize / 2
                );
                view.context.lineTo(right, 0);
                view.context.fillStyle = this.xAxisColor;
                view.context.fill();
            }
        }

        if (this.yAxis) {
            view.context.beginPath();
            view.context.moveTo(0, top);
            view.context.lineTo(0, bottom);
            view.context.strokeStyle = this.yAxisColor;
            const lw = view.context.lineWidth;
            view.context.lineWidth = this.yAxisWidth;
            view.context.stroke();
            view.context.lineWidth = lw;

            if (this.arrows) {
                view.context.beginPath();
                view.context.moveTo(
                    -this.arrowSize / 2,
                    top - this.arrowSize
                );
                view.context.lineTo(
                    this.arrowSize / 2,
                    top - this.arrowSize
                );
                view.context.lineTo(0, top);
                view.context.fillStyle = this.yAxisColor;
                view.context.fill();
            }
        }
    }
};

