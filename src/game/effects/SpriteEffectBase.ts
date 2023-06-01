import Mobile from "../mobile/Mobile";
import Sprite from "../sprite/Sprite";


export default abstract class SpriteEffectBase extends Mobile {

  constructor(
    context: CanvasRenderingContext2D,
    private sprite: Sprite
  ) {
    super(context)
    this.isLiving = false
  }

  render(delta: number): void {
    this.sprite.update(delta)
    this.sprite.draw(this.context, 0, 0, this.direction)
  }

  protected checkLifetimeEnd(): boolean {
    return this.sprite.loopCount > 0
  }
}
