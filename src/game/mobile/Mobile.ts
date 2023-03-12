import Point from "../core/Point"

export default abstract class Mobile {
  position = Point.zero()
  velocity = Point.zero()
  direction = new Point(0, 0)
  elapsed = 0

  constructor(
    protected context: CanvasRenderingContext2D
  ) {
  }

  animate(delta: number) {
    this.update(delta)
    this.render(delta)
  }

  move(distance: Point) {
    this.velocity = distance.unit()
    this.direction = distance
  }

  stop() {
    this.velocity = Point.zero()
  }

  private update(delta: number) {
    this.elapsed += delta
    this.position = this.position.add(this.velocity.multiply(delta / 5))
  }

  protected abstract render(delta: number): void
}
