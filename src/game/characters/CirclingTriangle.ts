import Mobile from "../mobile/Mobile"

export default class CirclingTriangle extends Mobile {

  constructor(
    context: CanvasRenderingContext2D
  ) {
    super(context)

    this.attributes.hp.max = 5
    this.attributes.power = 5
    this.attributes.size = 1
    this.speed = .5
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected update(_: number): void {
    if (this.enemies.length < 0) {
      return
    }
    this.moveToMobile(this.enemies[0])
    this.attack(this.enemies[0])
  }

  render(): void {
    this.context.save()
    this.context.rotate(this.direction.angle() + Math.PI / 2)
    this.context.beginPath()
    this.context.moveTo(0, -5)
    this.context.lineTo(5, 5)
    this.context.lineTo(0, 3)
    this.context.lineTo(-5, 5)
    this.context.lineTo(0, -5)
    this.context.fillStyle = "red"
    this.context.fill()
    this.context.restore()
  }
}
