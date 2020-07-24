import RenderItem from './Items/RenderItem';

export default class View {
    canvas: HTMLCanvasElement;
    
    context: CanvasRenderingContext2D;

    zoom: {
        x: number;
        y: number;
    };

    translation: {
        x: number;
        y: number;
    }

    items: RenderItem[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.zoom = {
            x: 1,
            y: 1,
        };
        this.translation = {
            x: 0,
            y: 0,
        };
        this.items = [];
    }

    render() {
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.translate(
            -this.translation.x * this.zoom.x,
            -this.translation.y * this.zoom.y
        )
        this.items.forEach((item) => {
            item.render(
                this.context,
                this,
                this.zoom,
                this.translation
            );
        });
    }
}
