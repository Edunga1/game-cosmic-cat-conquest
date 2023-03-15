import Mobile from "../mobile/Mobile"
import Sprite from "../sprite/Sprite"
import EffectSprite from "../../../assets/images/confetti-sprites.png"

export default class ConfettiEffect extends Mobile {
  private sprite: Sprite

  constructor(
    context: CanvasRenderingContext2D
  ) {
    super(context)

    const image = new Image()
    image.src = EffectSprite
    this.sprite = new Sprite(image, 81, 81, 45, false)
  }

  protected checkLifetimeEnd(): boolean {
    return this.sprite.loopCount > 0
  }

  protected render(delta: number): void {
    this.sprite.update(delta)
    this.sprite.draw(this.context, 0, 0, this.direction)
  }
}

