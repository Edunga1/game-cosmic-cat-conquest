import Point from "../core/Point"

export default abstract class Mobile {
  position = Point.zero()
  velocity = Point.zero()
  direction = new Point(0, 0)
  lifetime = 0
  maxLifetime = Infinity
  onLifetimeEnd: () => void

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

  moveTo(position: Point) {
    this.position = position
  }

  stop() {
    this.velocity = Point.zero()
  }

  private update(delta: number) {
    this.lifetime += delta
    this.position = this.position.add(this.velocity.multiply(delta / 5))
    // notify when lifetime is over
    if (this.checkLifetimeEnd()) {
      this.onLifetimeEnd?.()
    }
  }

  protected checkLifetimeEnd(): boolean {
    return this.lifetime > this.maxLifetime
  }

  protected abstract render(delta: number): void
}
