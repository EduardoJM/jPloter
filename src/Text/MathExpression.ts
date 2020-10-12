import { RenderItem, RenderItemBounds, RenderItemCreateOptions } from '../Base/RenderItem';
import { Point } from '../Geometry/Point';
import { applyProps } from '../Utils/props';
import { View } from '../View';

export interface MathExpressionCreateOptions extends RenderItemCreateOptions {
    latex?: string;
    pointName?: string;
}

interface MappedKaTexItem {
    el: HTMLElement;
    left: number;
    top: number;
    width: number;
    height: number;
}

interface WindowHelper {
    html2canvas: (el: HTMLElement) => Promise<HTMLCanvasElement>;
}

export class MathExpression implements RenderItem {
    name: string;

    latex: string;

    pointName: string;

    point: Point | null;

    canvas: HTMLCanvasElement | null;

    constructor(opts?: MathExpressionCreateOptions) {
        this.name = '';
        this.latex = '';
        this.pointName = '';
        this.point = null;
        this.canvas = null;
        
        applyProps(opts, this);
    }

    rebuildCanvas (view: View): void {
        if (!view.renderKaTeX || !(window as any).html2canvas) {
            return;
        }
        const str = view.renderKaTeX(this.latex);
        const div = document.createElement('div');
        div.style.display = 'inline-block';
        div.style.position = 'absolute';
        div.style.left = '-10000px';
        div.style.top = '-10000px';
        document.body.append(div);
        div.innerHTML = str;
        const containerBox = div.getBoundingClientRect();
        div.style.width = (containerBox.width + 20) + 'px';
        div.style.height = (containerBox.height + 20) + 'px';

        function eachLevel(
            spans: HTMLElement[] | HTMLCollection,
            parentBounding: DOMRect
        ) : MappedKaTexItem[] {
            const mapped = [];
            for (let i = 0; i < spans.length; i += 1) {
                const item = spans[i];
                const rc = item.getBoundingClientRect();
                mapped.push({
                    el: item as HTMLElement,
                    left: rc.left - parentBounding.left,
                    top: rc.top - parentBounding.top,
                    width: rc.width,
                    height: rc.height,
                });
                const childs = item.children;
                if (childs.length > 0) {
                    mapped.push(
                        ...eachLevel(childs, rc)
                    );
                }
            }
            return mapped;
        }

        const mapped = eachLevel(div.children, containerBox);
        mapped.forEach((item) => {
            item.el.style.position = 'absolute';
            item.el.style.left = item.left + 'px';
            item.el.style.top = item.top + 'px';
            item.el.style.width = item.width + 'px';
            item.el.style.height = item.height + 'px';
        });

        (window as any).html2canvas(div, {
            backgroundColor: null,
        }).then((canvas: HTMLCanvasElement) => {
            this.canvas = canvas;
            view.render();
        });
    }

    getBounding(view: View): RenderItemBounds {
        if (!this.canvas) {
            this.rebuildCanvas(view);
        }
        const empty = { left: 0, top: 0, right: 0, bottom: 0 };
        const point = view.getItemByName(this.pointName);
        if (!point || !(point instanceof Point) || !this.canvas) {
            this.point = null;
            return empty;
        }
        this.point = point;
        const { x, y } = this.point.getPointCoords(view);
        const p1 = view.spacePointToCanvas(x, y);
        return {
            left: p1.x,
            right: p1.x + this.canvas.width,
            top: p1.y,
            bottom: p1.x + this.canvas.height
        };
    }
    
    render(view: View): void {
        if (this.latex === '' || !this.point || !this.canvas) {
            return;
        }
        const { x, y } = this.point.getPointCoords(view);
        const p1 = view.spacePointToCanvas(x, y);
        view.context.drawImage(this.canvas, p1.x, p1.y, this.canvas.width, this.canvas.height);
        /*
        view.context.beginPath();
        view.context.moveTo(p1.x, p1.y);
        view.context.lineTo(p2.x, p2.y);
        this.strokeStyle.applyTo(view.context);
        view.context.stroke();
        */
    }

    getSerializationId(): string {
        return 'textMathExpression';
    }
}
