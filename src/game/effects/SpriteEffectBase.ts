import Mobile from "../mobile/Mobile";
import Sprite from "../sprite/Sprite";


export default abstract class SpriteEffectBase extends Mobile {

  constructor(
    context: CanvasRenderingContext2D,
    private sprite: Sprite
  ) {
    super(context);
  }

  protected checkLifetimeEnd(): boolean {
    return this.sprite.loopCount > 0
  }

  protected render(delta: number): void {
    this.sprite.update(delta)
    this.sprite.draw(this.context, 0, 0, this.direction)
  }
}
