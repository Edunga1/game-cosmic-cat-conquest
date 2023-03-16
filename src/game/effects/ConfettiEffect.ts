import Sprite from "../sprite/Sprite"
import EffectSprite from "../../../assets/images/confetti-sprites.png"
import SpriteEffectBase from "./SpriteEffectBase"

export default class ConfettiEffect extends SpriteEffectBase {
  constructor(
    context: CanvasRenderingContext2D
  ) {
    const image = new Image()
    image.src = EffectSprite
    const sprite = new Sprite(image, 81, 81, 45, false)
    super(context, sprite)
  }
}
