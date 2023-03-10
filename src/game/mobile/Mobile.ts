import Point from "../core/Point"

export default class Mobile {
    position = Point.zero()
    velocity = Point.zero()
    elapsed = 0

    constructor(
        private context: CanvasRenderingContext2D
    ) {
    }

    animate(delta: number) {
        this.update(delta)
        this.render()
    }

    private update(delta: number) {
        this.elapsed += delta
        this.position = this.position.add(this.velocity.multiply(delta / 5))
    }

    private render() {
        this.context.save()
        this.context.rotate(this.elapsed / 1000)
        this.context.beginPath()
        this.context.moveTo(0, -20)
        this.context.lineTo(10, 10)
        this.context.lineTo(0, 7)
        this.context.lineTo(-10, 10)
        this.context.lineTo(0, -20)
        this.context.fillStyle = "red"
        this.context.fill()
        this.context.restore()
    }
}

