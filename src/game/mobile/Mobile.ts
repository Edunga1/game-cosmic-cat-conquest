import Point from "../core/Point"

export default abstract class Mobile {
    position = Point.zero()
    velocity = Point.zero()
    elapsed = 0

    constructor(
        protected context: CanvasRenderingContext2D
    ) {
    }

    animate(delta: number) {
        this.update(delta)
        this.render(delta)
    }

    private update(delta: number) {
        this.elapsed += delta
        this.position = this.position.add(this.velocity.multiply(delta / 5))
    }

    protected abstract render(delta: number): void
}

