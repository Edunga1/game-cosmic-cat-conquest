import Point from "../core/Point"
import Attributes from "./Attributes"

export default abstract class Mobile {
  position = Point.zero()
  velocity = Point.zero()
  direction = new Point(0, 0)
  lifetime = 0
  maxLifetime = Infinity
  onLifetimeEnd: () => void
  attributes = new Attributes(5, 1)
  enemies: Mobile[] = []

  constructor(
    protected context: CanvasRenderingContext2D,
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

  attack(target: Mobile) {
    target.attributes.hp.value -= this.attributes.power
  }

  isOpponent(mobile: Mobile): boolean {
    return this.enemies.includes(mobile)
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
