import { View } from './View';

export class Mouse {
    view: View;

    active: boolean;

    canZoom: boolean;

    startX: number;
    
    startY: number;

    dragging: boolean;

    constructor(canvasView: View) {
        this.active = false;
        this.canZoom = false;
        this.startX = 0;
        this.startY = 0;
        this.dragging = false;
        this.view = canvasView;
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.wheel = this.wheel.bind(this);
        this.view.canvas.addEventListener('mousedown', this.mouseDown);
        this.view.canvas.addEventListener('wheel', this.wheel);
    }

    disable() {
        this.active = false;
    }

    enable() {
        this.active = true;
    }

    enableZoom() {
        this.canZoom = true;
    }

    disableZoom() {
        this.canZoom = false;
    }

    remove() {
        this.view.canvas.removeEventListener('mousedown', this.mouseDown);
        this.view.canvas.removeEventListener('wheel', this.wheel);
    }

    mouseUp(e: MouseEvent) {
        this.dragging = false;
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseMove(e: MouseEvent) {
        if (!this.dragging) {
            return;
        }
        const rc = this.view.canvas.getBoundingClientRect();
        const px = e.pageX - rc.left;
        const py = e.pageY - rc.top;
        const dx = px - this.startX;
        const dy = py - this.startY;
        this.startX = px;
        this.startY = py;
        this.view.translation = {
            x: this.view.translation.x - dx / this.view.zoom.x,
            y: this.view.translation.y - dy / this.view.zoom.y,
        };
        this.view.render();
    }

    mouseDown(e: MouseEvent) {
        if (!this.active) {
            return;
        }
        const rc = this.view.canvas.getBoundingClientRect();
        this.startX = e.pageX - rc.left;
        this.startY = e.pageY - rc.top;
        this.dragging = true;
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    wheel(e: WheelEvent) {
        if (!this.canZoom) {
            return;
        }
        // this translation is to zoom with the center in focus
        const w = this.view.canvas.width / this.view.zoom.x;
        const h = this.view.canvas.height / this.view.zoom.y;
        const nw = this.view.canvas.width / (this.view.zoom.x - e.deltaY);
        const nh = this.view.canvas.height / (this.view.zoom.y - e.deltaY);
        this.view.translation = {
            x: this.view.translation.x - ((nw - w) / 2),
            y: this.view.translation.y - ((nh - h) / 2),
        };
        this.view.zoom = {
            x: this.view.zoom.x - e.deltaY,
            y: this.view.zoom.y - e.deltaY
        };
        this.view.render();
    }
}
