import Point from "../core/math/Point"
import Attributes from "./Attributes"
import MobileCollection from "./MobileCollection"

export default abstract class Mobile {
  position = Point.zero()
  velocity = Point.zero()
  speed = 1
  direction = new Point(0, 0)
  lifetime = 0
  maxLifetime = Infinity
  isLiving = true
  onLifetimeEnd?: () => void
  attributes = new Attributes()
  lastAttack = 0
  isAlive = true
  enemies: MobileCollection = new MobileCollection()

  constructor(
    protected context: CanvasRenderingContext2D,
  ) {}

  animate(delta: number) {
    this.updateEssentials(delta)
    this.update(delta)
    this.render(delta)
  }

  move(distance: Point) {
    this.velocity = distance.limit(this.speed)
    this.direction = distance
  }

  moveToMobile(target: Mobile) {
    const distance = target.position.subtract(this.position)
    if (distance.length() < target.attributes.size) {
      this.stop()
      return
    }
    const margin = distance.unit().multiply(target.attributes.size)
    const dest = distance.subtract(margin)
    this.move(dest)
  }

  stop() {
    this.velocity = Point.zero()
  }

  attack(target: Mobile) {
    if (this.lastAttack < this.attributes.attackPeriod) {
      return
    }

    if (this.attributes.range.value < this.position.distanceTo(target.position) - target.attributes.size) {
      return
    }

    this.lastAttack = 0
    this.direction = target.position.subtract(this.position)
    target.damage(this.attributes.power)
  }

  isOpponent(mobile: Mobile): boolean {
    return this.enemies.includes(mobile)
  }

  private updateEssentials(delta: number) {
    this.lifetime += delta
    this.lastAttack += delta
    this.position = this.position.add(this.velocity.multiply(delta / 5))
    // notify when lifetime is over
    if (this.checkLifetimeEnd()) {
      this.onLifetimeEnd?.()
    }
  }

  private damage(damage: number) {
    this.attributes.hp.value -= damage
    if (this.attributes.hp.value <= 0) {
      this.isAlive = false
    }
  }

  protected checkLifetimeEnd(): boolean {
    return this.lifetime > this.maxLifetime
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected update(_: number): void { /* empty */ }

  protected abstract render(delta: number): void
}
