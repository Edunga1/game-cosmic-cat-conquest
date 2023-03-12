import Mobile from "../mobile/Mobile"
import Sprite from "../sprite/Sprite"

export default class CirclingTriangle extends Mobile {
  sprite: Sprite

  constructor(
    context: CanvasRenderingContext2D
  ) {
    super(context)
  }

  render() {
    this.context.save()
    this.context.rotate(this.elapsed / 1000)
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