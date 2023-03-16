import Sprite from "../sprite/Sprite"
import EffectSprite from "../../../assets/images/confetti-sprites.png"
import SpriteEffectBase from "./SpriteEffectBase"
import Point from "../core/Point"

export default class ConfettiEffect extends SpriteEffectBase {
  constructor(
    context: CanvasRenderingContext2D
  ) {
    const image = new Image()
    image.src = EffectSprite
    const sprite = new Sprite(image, 81, 81, 10, false)
    super(context, sprite)
  }

  protected render(delta: number): void {
    this.context.save()
    const gap = this.direction.unit().multiply(30)
    this.context.translate(gap.x, gap.y)
    // sprite is facing left, so rotate 90 degrees to face up
    this.context.rotate(this.direction.angle() + Math.PI / 2)
    super.render(delta)
    this.context.restore()
  }
}
