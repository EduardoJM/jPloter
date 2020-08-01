import { RenderItem } from './RenderItem';
import { View } from '../View';

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

export class Axis implements RenderItem {
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

    getMinMax(initialMin: number, initialMax: number): {
        min: number;
        max: number;
    } {
        let min = initialMin;
        let max = initialMax;
        if (min < 0) {
            min = Math.ceil(min);
        } else {
            min = Math.floor(min);
        }
        if (max < 0) {
            max = Math.ceil(max);
        } else {
            max = Math.floor(max);
        }
        return {
            min,
            max,
        };
    }

    renderThickText(view: View, text: string, x: number, y: number, isXaxis: boolean) {
        const transform = view.context.getTransform();
        view.context.textAlign = 'center';
        view.context.fillStyle = isXaxis ? this.xAxisThickColor : this.yAxisThickColor;
        view.context.font = isXaxis ? this.xAxisThickFont : this.yAxisThickFont;
        view.context.fillText(text, x, y);
        view.context.setTransform(transform);
    }

    renderX(view: View, middleX: number, middleY: number) {
        const left = 0;
        const right = left + view.canvas.width;
        const localWidth = view.canvas.width / view.zoom.x;
        const localHeight = view.canvas.height / view.zoom.y;
        if (this.xAxis) {
            // x axis
            view.context.beginPath();
            view.context.moveTo(left, middleY);
            view.context.lineTo(
                this.arrows ? right - this.arrowSize : right,
                middleY
            );
            view.context.strokeStyle = this.xAxisColor;
            view.context.lineWidth = this.xAxisWidth;
            view.context.stroke();
            // x arrow
            if (this.arrows) {
                view.context.beginPath();
                view.context.moveTo(
                    right - this.arrowSize,
                    middleY - (this.arrowSize / 2)
                );
                view.context.lineTo(
                    right - this.arrowSize,
                    middleY + (this.arrowSize / 2)
                );
                view.context.lineTo(right, middleY);
                view.context.fillStyle = this.xAxisColor;
                view.context.fill();
            }
            // x thicks
            if (this.xAxisThick) {
                let { min:xMin, max: xMax} = this.getMinMax(
                    view.translation.x,
                    view.translation.x + localWidth
                );
                for (let i = xMin; i <= xMax; i += 1) {
                    if (i === 0) {
                        continue;
                    }
                    view.context.beginPath();
                    const { x: pX } = view.spacePointToCanvas(i, 0);
                    const sz = this.xAxisThickSize;
                    if (this.xAxisThickStyle === 'middle') {
                        view.context.moveTo(pX, middleY - (sz / 2));
                        view.context.lineTo(pX, middleY + (sz / 2));
                    } else if (this.xAxisThickStyle === 'lower') {
                        view.context.moveTo(pX, middleY);
                        view.context.lineTo(pX, middleY + sz);
                    } else {
                        view.context.moveTo(pX, middleY);
                        view.context.lineTo(pX, middleY - sz);
                    }
                    view.context.strokeStyle = this.xAxisThickColor;
                    view.context.lineWidth = this.xAxisThickWidth;
                    view.context.stroke();
                    if (this.xAxisThickNumbers) {
                        this.renderThickText(view, i.toString(), pX, middleY + (sz + 10), true);
                    }
                }
                // the 0
                if (this.xAxisThickNumbers
                    && view.translation.x < 0
                    && view.translation.x + localWidth > 0
                    && view.translation.y < 0
                    && view.translation.y + localHeight > 0) {
                    const sz = this.xAxisThickSize + 10;
                    this.renderThickText(view, '0', middleX - sz, middleY + sz, true);
                }
            }
        }
    }

    renderY(view: View, middleX: number, middleY: number) {
        const top = 0;
        const bottom = top + view.canvas.height;
        const localHeight = view.canvas.height / view.zoom.y;
        if (this.yAxis) {
            // y axis
            view.context.beginPath();
            view.context.moveTo(
                middleX,
                this.arrows ? top + this.arrowSize : top
            );
            view.context.lineTo(middleX, bottom);
            view.context.strokeStyle = this.yAxisColor;
            view.context.lineWidth = this.yAxisWidth;
            view.context.stroke();
            // y arrow
            if (this.arrows) {
                view.context.beginPath();
                view.context.moveTo(
                    middleX - (this.arrowSize / 2),
                    top + this.arrowSize
                );
                view.context.lineTo(
                    middleX + (this.arrowSize / 2),
                    top + this.arrowSize
                );
                view.context.lineTo(middleX, top);
                view.context.fillStyle = this.yAxisColor;
                view.context.fill();
            }
            // y thicks
            if (this.yAxisThick) {
                let { min:yMin, max: yMax} = this.getMinMax(
                    view.translation.y,
                    view.translation.y + localHeight
                );
                for (let i = yMin; i <= yMax; i += 1) {
                    if (i === 0) {
                        continue;
                    }
                    view.context.beginPath();
                    const { y: pY } = view.spacePointToCanvas(0, -i);
                    const sz = this.yAxisThickSize;
                    if (this.yAxisThickStyle === 'middle') {
                        view.context.moveTo(middleX - sz / 2, pY);
                        view.context.lineTo(middleX + sz / 2, pY);
                    } else if (this.yAxisThickStyle === 'left') {
                        view.context.moveTo(middleX - sz, pY);
                        view.context.lineTo(middleX, pY);
                    } else {
                        view.context.moveTo(middleX, pY);
                        view.context.lineTo(middleX + sz, pY);
                    }
                    view.context.strokeStyle = this.yAxisThickColor;
                    view.context.lineWidth = this.yAxisThickWidth;
                    view.context.stroke();

                    if (this.yAxisThickNumbers) {
                        this.renderThickText(view, (-i).toString(), middleX - (sz + 10), pY, false);
                    }
                }
            }
        }
    }

    render(view: View) {
        const { x: middleX, y: middleY } = view.spacePointToCanvas(0, 0);
        this.renderX(view, middleX, middleY);
        this.renderY(view, middleX, middleY);
    }
};
