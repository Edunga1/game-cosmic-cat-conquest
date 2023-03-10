import Point from "../core/point";

export default class Mobile {
    position = Point.zero()

    constructor(
        private context: CanvasRenderingContext2D
    ) {
    }

    animate(time: number) {
        this.render(time);
    }

    private render(time: number) {
        this.context.save();
        this.context.rotate(time / 1000);
        this.context.beginPath();
        this.context.moveTo(0, -20);
        this.context.lineTo(10, 10);
        this.context.lineTo(0, 7);
        this.context.lineTo(-10, 10);
        this.context.lineTo(0, -20);
        this.context.fillStyle = "red";
        this.context.fill();
        this.context.restore();
    }
}

