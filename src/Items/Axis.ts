import { RenderItem, RenderItemCreateOptions, RenderItemBounds } from './RenderItem';
import { View } from '../View';
import { applyProps } from '../Utils/props';
import { LineStyle, LineStyleOptions } from '../LineStyle';

export interface AxisCreateOptions extends RenderItemCreateOptions {
    xAxis?: boolean;
    xAxisStyle?: LineStyleOptions;
    yAxis?: boolean;
    yAxisStyle?: LineStyleOptions;
    arrows?: boolean;
    arrowSize?: number;

    xAxisThick?: boolean;
    xAxisThickSize?: number;
    xAxisThickStyle?: LineStyleOptions;
    xAxisThickPosition?: 'upper' | 'lower' | 'middle';
    xAxisThickNumbers?: boolean;
    xAxisThickFont?: string;

    yAxisThick?: boolean;
    yAxisThickSize?: number;
    yAxisThickStyle?: LineStyleOptions;
    yAxisThickPosition?: 'left' | 'right' | 'middle';
    yAxisThickNumbers?: boolean;
    yAxisThickFont?: string;
}

export class Axis implements RenderItem {
    name: string;

    xAxis: boolean;

    xAxisStyle: LineStyle;

    yAxis: boolean;

    yAxisStyle: LineStyle;

    arrows: boolean;

    arrowSize: number;

    xAxisThick: boolean;

    xAxisThickSize: number;

    xAxisThickStyle: LineStyle;

    xAxisThickPosition: 'upper' | 'lower' | 'middle';

    xAxisThickNumbers: boolean;

    xAxisThickFont: string;

    yAxisThick: boolean;

    yAxisThickSize: number;
    
    yAxisThickStyle: LineStyle;

    yAxisThickPosition: 'left' | 'right' | 'middle';

    yAxisThickNumbers: boolean;

    yAxisThickFont: string;

    constructor(opts?: AxisCreateOptions) {
        this.name = '';
        this.xAxis = true;
        this.xAxisStyle = new LineStyle();
        this.yAxis = true;
        this.yAxisStyle = new LineStyle();
        this.arrows = true;
        this.arrowSize = 10;
        this.xAxisThick = true;
        this.xAxisThickSize = 10;
        this.xAxisThickStyle = new LineStyle();
        this.xAxisThickPosition = 'middle';
        this.xAxisThickNumbers = true;
        this.xAxisThickFont = 'Arial 16px';
        this.yAxisThick = true;
        this.yAxisThickSize = 10;
        this.yAxisThickStyle = new LineStyle();
        this.yAxisThickPosition = 'middle';
        this.yAxisThickNumbers = true;
        this.yAxisThickFont = 'Arial 16px';
        
        applyProps(opts, this);
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
        view.context.fillStyle = isXaxis 
            ? this.xAxisThickStyle.getContextStyle()
            : this.yAxisThickStyle.getContextStyle();
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
            this.xAxisStyle.applyTo(view);
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
                view.context.fillStyle = this.xAxisStyle.getContextStyle();
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
                    if (this.xAxisThickPosition === 'middle') {
                        view.context.moveTo(pX, middleY - (sz / 2));
                        view.context.lineTo(pX, middleY + (sz / 2));
                    } else if (this.xAxisThickPosition === 'lower') {
                        view.context.moveTo(pX, middleY);
                        view.context.lineTo(pX, middleY + sz);
                    } else {
                        view.context.moveTo(pX, middleY);
                        view.context.lineTo(pX, middleY - sz);
                    }
                    this.xAxisThickStyle.applyTo(view);
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
            this.yAxisStyle.applyTo(view);
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
                view.context.fillStyle = this.yAxisStyle.getContextStyle();
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
                    if (this.yAxisThickPosition === 'middle') {
                        view.context.moveTo(middleX - sz / 2, pY);
                        view.context.lineTo(middleX + sz / 2, pY);
                    } else if (this.yAxisThickPosition === 'left') {
                        view.context.moveTo(middleX - sz, pY);
                        view.context.lineTo(middleX, pY);
                    } else {
                        view.context.moveTo(middleX, pY);
                        view.context.lineTo(middleX + sz, pY);
                    }
                    this.yAxisThickStyle.applyTo(view);
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

    getBounding(view: View): RenderItemBounds {
        let boundingLeft = 0;
        let boundingTop = 0;
        let boundingRight = 0;
        let boundingBottom = 0;

        const { x: middleX, y: middleY } = view.spacePointToCanvas(0, 0);
        const left = 0;
        const right = left + view.canvas.width;
        const top = 0;
        const bottom = top + view.canvas.height;
        if (this.xAxis) {
            boundingLeft = left;
            boundingRight = right;
            boundingTop = middleY - (this.xAxisStyle.lineWidth / 2);
            boundingBottom = middleY + (this.xAxisStyle.lineWidth / 2);
            if (this.arrows) {
                boundingTop = middleY - (this.arrowSize / 2);
                boundingBottom = middleY + (this.arrowSize / 2);
            }
            if (this.xAxisThick) {
                const sz = this.xAxisThickSize;
                if (this.xAxisThickPosition === 'middle') {
                    boundingTop = Math.min(boundingTop, middleY - (sz / 2));
                    boundingBottom = Math.max(boundingBottom, middleY + (sz / 2));
                } else if (this.xAxisThickPosition === 'lower') {
                    boundingTop = Math.min(boundingTop, middleY);
                    boundingBottom = Math.max(boundingBottom, middleY + sz);
                } else {
                    boundingTop = Math.min(boundingTop, middleY - sz);
                    boundingBottom = Math.max(boundingBottom, middleY);
                }
                if (this.xAxisThickNumbers) {
                    boundingBottom = Math.max(boundingBottom, middleY + (sz + 40));
                }
            }
        }
        if (this.yAxis) {
            boundingLeft = Math.min(boundingLeft, middleX - (this.yAxisStyle.lineWidth / 2));
            boundingRight = Math.max(boundingRight, middleX + (this.yAxisStyle.lineWidth / 2));
            boundingTop = Math.min(boundingTop, top);
            boundingBottom = Math.max(boundingBottom, bottom);
            if (this.arrows) {
                boundingLeft = Math.min(boundingLeft, middleX - (this.arrowSize / 2));
                boundingRight = Math.max(boundingRight, middleX + (this.arrowSize / 2));
            }
            if (this.yAxisThick) {
                const sz = this.yAxisThickSize;
                if (this.yAxisThickPosition === 'middle') {
                    boundingLeft = Math.min(boundingLeft, middleX - (sz / 2));
                    boundingRight = Math.max(boundingRight, middleX + (sz / 2));
                } else if (this.yAxisThickPosition === 'left') {
                    boundingLeft = Math.min(boundingLeft, middleX - sz);
                    boundingRight = Math.max(boundingRight, middleX);
                } else {
                    boundingLeft = Math.min(boundingLeft, middleX);
                    boundingRight = Math.max(boundingRight, middleX + sz);
                }
                if (this.yAxisThickNumbers) {
                    boundingLeft = Math.min(boundingLeft, middleX - (sz + 30));
                }
            }
        }
        return {
            left: boundingLeft,
            right: boundingRight,
            top: boundingTop,
            bottom: boundingBottom
        };
    }
};
