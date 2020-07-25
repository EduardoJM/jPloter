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

    xAxisThick?: boolean;
    xAxisThickSize?: number;
    xAxisThickWidth?: number;
    xAxisThickStyle?: 'upper' | 'lower' | 'middle';
    xAxisThickColor?: string;
    xAxisThickNumbers?: boolean;
    xAxisThickFont?: string;

    yAxisThick?: boolean;
    yAxisThickSize?: number;
    yAxisThickWidth?: number;
    yAxisThickStyle?: 'left' | 'right' | 'middle';
    yAxisThickColor?: string;
    yAxisThickNumbers?: boolean;
    yAxisThickFont?: string;
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

    xAxisThick: boolean;

    xAxisThickSize: number;

    xAxisThickWidth: number;

    xAxisThickStyle: 'upper' | 'lower' | 'middle';

    xAxisThickColor: string;

    xAxisThickNumbers: boolean;

    xAxisThickFont: string;

    yAxisThick: boolean;

    yAxisThickSize: number;
    
    yAxisThickWidth: number;

    yAxisThickStyle: 'left' | 'right' | 'middle';
    
    yAxisThickColor: string;

    yAxisThickNumbers: boolean;

    yAxisThickFont: string;

    constructor(opts?: AxisCreateOptions) {
        this.xAxis = true;
        this.xAxisWidth = 2;
        this.xAxisColor = 'black';
        this.yAxis = true;
        this.yAxisWidth = 2;
        this.yAxisColor = 'black';
        this.arrows = true;
        this.arrowSize = 10;
        this.xAxisThick = true;
        this.xAxisThickSize = 10;
        this.xAxisThickWidth = 2;
        this.xAxisThickStyle = 'middle';
        this.xAxisThickColor = 'black';
        this.xAxisThickNumbers = true;
        this.xAxisThickFont = 'Arial 16px';
        this.yAxisThick = true;
        this.yAxisThickSize = 10;
        this.yAxisThickWidth = 2;
        this.yAxisThickStyle = 'middle';
        this.yAxisThickColor = 'black';
        this.yAxisThickNumbers = true;
        this.yAxisThickFont = 'Arial 16px';

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
            if (opts.xAxisThick !== null && opts.xAxisThick !== undefined) {
                this.xAxisThick = opts.xAxisThick;
            }
            if (opts.xAxisThickSize !== null && opts.xAxisThickSize !== undefined) {
                this.xAxisThickSize = opts.xAxisThickSize;
            }
            if (opts.xAxisThickWidth !== null && opts.xAxisThickWidth !== undefined) {
                this.xAxisThickWidth = opts.xAxisThickWidth;
            }
            if (opts.xAxisThickStyle !== null && opts.xAxisThickStyle !== undefined) {
                this.xAxisThickStyle = opts.xAxisThickStyle;
            }
            if (opts.xAxisThickColor !== null && opts.xAxisThickColor !== undefined) {
                this.xAxisThickColor = opts.xAxisThickColor;
            }
            if (opts.xAxisThickNumbers !== null && opts.xAxisThickNumbers !== undefined) {
                this.xAxisThickNumbers = opts.xAxisThickNumbers;
            }
            if (opts.xAxisThickFont !== null && opts.xAxisThickFont !== undefined) {
                this.xAxisThickFont = opts.xAxisThickFont;
            }
            if (opts.yAxisThick !== null && opts.yAxisThick !== undefined) {
                this.yAxisThick = opts.yAxisThick;
            }
            if (opts.yAxisThickSize !== null && opts.yAxisThickSize !== undefined) {
                this.yAxisThickSize = opts.yAxisThickSize;
            }
            if (opts.yAxisThickWidth !== null && opts.yAxisThickWidth !== undefined) {
                this.yAxisThickWidth = opts.yAxisThickWidth;
            }
            if (opts.yAxisThickStyle !== null && opts.yAxisThickStyle !== undefined) {
                this.yAxisThickStyle = opts.yAxisThickStyle;
            }
            if (opts.yAxisThickColor !== null && opts.yAxisThickColor !== undefined) {
                this.yAxisThickColor = opts.yAxisThickColor;
            }
            if (opts.yAxisThickNumbers !== null && opts.yAxisThickNumbers !== undefined) {
                this.yAxisThickNumbers = opts.yAxisThickNumbers;
            }
            if (opts.yAxisThickFont !== null && opts.yAxisThickFont !== undefined) {
                this.yAxisThickFont = opts.yAxisThickFont;
            }
        }
    }

    render(view: View) {
        const { x: left, y: top }
            = view.spacePointToCanvas(view.translation.x, -view.translation.y);
        const right = left + view.canvas.width;
        const bottom = top - view.canvas.height;

        const { x: localWidth, y: localHeight }
            = view.canvasPointToSpace(view.canvas.width, view.canvas.height);

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

            // thicks
            if (this.xAxisThick) {
                let xMin = view.translation.x;
                let xMax = view.translation.x + localWidth;
                if (xMin < 0) {
                    xMin = Math.ceil(xMin);
                }
                if (xMax < 0) {
                    xMax = Math.ceil(xMax);
                }
                if (xMin > 0) {
                    xMin = Math.floor(xMin);
                }
                if (xMax > 0) {
                    xMax = Math.floor(xMax);
                }
                for (let i = xMin; i <= xMax; i += 1) {
                    if (i === 0) {
                        continue;
                    }
                    view.context.beginPath();
                    const { x: pX } = view.spacePointToCanvas(i, 0);
                    const sz = this.xAxisThickSize;
                    if (this.xAxisThickStyle === 'middle') {
                        view.context.moveTo(pX, -sz / 2);
                        view.context.lineTo(pX, sz / 2);
                    } else if (this.xAxisThickStyle === 'lower') {
                        view.context.moveTo(pX, 0);
                        view.context.moveTo(pX, -sz);
                    } else {
                        view.context.moveTo(pX, 0);
                        view.context.moveTo(pX, sz);
                    }
                    view.context.strokeStyle = this.xAxisThickColor;
                    const lw = view.context.lineWidth;
                    view.context.lineWidth = this.xAxisThickWidth;
                    view.context.stroke();
                    view.context.lineWidth = lw;

                    if (this.xAxisThickNumbers) {
                        const transform = view.context.getTransform();
                        view.context.scale(1, -1);
                        view.context.textAlign = 'center';
                        view.context.fillStyle = this.xAxisThickColor;
                        view.context.font = this.xAxisThickFont;
                        view.context.fillText(i.toString(), pX, sz + 10);
                        view.context.setTransform(transform);
                    }
                }
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


            // thicks
            if (this.yAxisThick) {
                let yMin = view.translation.y;
                let yMax = view.translation.y + localWidth;
                if (yMin < 0) {
                    yMin = Math.ceil(yMin);
                }
                if (yMax < 0) {
                    yMax = Math.ceil(yMax);
                }
                if (yMin > 0) {
                    yMin = Math.floor(yMin);
                }
                if (yMax > 0) {
                    yMax = Math.floor(yMax);
                }
                for (let i = yMin; i <= yMax; i += 1) {
                    if (i === 0) {
                        continue;
                    }
                    view.context.beginPath();
                    const { y: pY } = view.spacePointToCanvas(0, -i);
                    const { y: pYInverted } = view.spacePointToCanvas(0, i);
                    const sz = this.yAxisThickSize;
                    if (this.yAxisThickStyle === 'middle') {
                        view.context.moveTo(-sz / 2, pY);
                        view.context.lineTo(sz / 2, pY);
                    } else if (this.yAxisThickStyle === 'left') {
                        view.context.moveTo(-sz, pY);
                        view.context.moveTo(0, pY);
                    } else {
                        view.context.moveTo(0, pY);
                        view.context.moveTo(sz, pY);
                    }
                    view.context.strokeStyle = this.yAxisThickColor;
                    const lw = view.context.lineWidth;
                    view.context.lineWidth = this.yAxisThickWidth;
                    view.context.stroke();
                    view.context.lineWidth = lw;

                    if (this.yAxisThickNumbers) {
                        const transform = view.context.getTransform();
                        view.context.scale(1, -1);
                        view.context.textAlign = 'center';
                        view.context.fillStyle = this.yAxisThickColor;
                        view.context.font = this.yAxisThickFont;
                        view.context.fillText((-i).toString(), -sz - 10, pYInverted);
                        view.context.setTransform(transform);
                    }
                }
            }
        }
    }
};

