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
  attributes = new Attributes()
  lastAttack = 0
  isAlive = true
  score = 0
  fame = 0
  appearanceSize = 1
  enemies: MobileCollection = new MobileCollection()

  onLifetimeEnd?: () => void
  onDeath: ((mobile: Mobile) => void)[] = []

  constructor(
    protected context: CanvasRenderingContext2D,
  ) { }

  update(delta: number) {
    this.updateEssentials(delta)
    this.afterUpdate()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_delta: number) { /** implement in child */ }

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

  attack(targets: Mobile[]): boolean {
    if (this.lastAttack < this.attributes.attackPeriod) {
      return false
    }

    const targetsInRange = targets.filter(t =>
      this.attributes.range.value >= this.position.distanceTo(t.position) - t.attributes.size
    )

    if (targetsInRange.length === 0) {
      return false
    }

    this.lastAttack = 0
    this.direction = targets[0].position.subtract(this.position)
    targets.forEach(target => target.damage(this.attributes.power))
      
    return true
  }

  attackDirection(direction: Point): boolean {
    const attackPoint = this.position.add(direction.unit().multiply(this.attributes.range.value))
    const targets = this.enemies.nearestMobilesInRange(attackPoint, this.attributes.range.value)
    const result = this.attack(targets)
    this.direction = direction.unit()
    return result
  }

  isOpponent(mobile: Mobile): boolean {
    return this.enemies.includes(mobile)
  }

  scoreByMobile(mobile: Mobile) {
    this.score += mobile.fame
  }

  protected checkLifetimeEnd(): boolean {
    return this.lifetime > this.maxLifetime
  }

  protected afterUpdate() { /** implement in child */ }

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
      this.die()
    }
  }

  private die() {
    this.isAlive = false
    this.onDeath.forEach(callback => callback(this))
  }
}
