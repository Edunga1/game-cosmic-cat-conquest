import Mobile from "../mobile/Mobile"
import Sprite from "../sprite/Sprite"
import CatSprite from "../../../assets/images/cat-sprites-running.png"


export default class Cat extends Mobile {
  sprite: Sprite

  constructor(
    context: CanvasRenderingContext2D
  ) {
    super(context)

    const image = new Image()
    image.src = CatSprite
    this.sprite = new Sprite(image, 22, 16, 10)
  }

  render(delta: number) {
    this.sprite.update(delta)
    this.sprite.draw(this.context, 0, 0)
  }
}
