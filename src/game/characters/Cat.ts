import Mobile from "../mobile/Mobile"
import Sprite from "../sprite/Sprite"
import CatRunningSprite from "../../../assets/images/cat-sprites-running.png"
import CatIdleSprite from "../../../assets/images/cat-sprites-idle.png"
import Point from "../core/math/Point"

enum Mode {
  IDLE,
  RUNNING,
}

export default class Cat extends Mobile {
  private sprites: Map<Mode, Sprite> = new Map()
  private mode = Mode.IDLE

  static SPRITES = [
    { mode: Mode.IDLE, img: CatIdleSprite, width: 20, height: 15, fps: 5 },
    { mode: Mode.RUNNING, img: CatRunningSprite, width: 22, height: 16, fps: 10 },
  ]

  constructor(
    context: CanvasRenderingContext2D
  ) {
    super(context)

    this.attributes.hp.max = 50
    this.attributes.power = 5
    this.attributes.size = 10
    this.attributes.range.value = 50
    this.attributes.range.max = 50
    this.attributes.attackPeriod = 0
    this.appearanceSize = 10

    Cat.SPRITES.forEach(({ mode, img, width, height, fps }) => {
      const image = new Image()
      image.src = img
      this.sprites.set(mode, new Sprite(image, width, height, fps))
    })
  }

  render(delta: number) {
    const sprite = this.sprites.get(this.mode)
    sprite?.update(delta)
    sprite?.draw(this.context, 0, 0, this.direction)
  }

  move(distance: Point) {
    super.move(distance)
    this.mode = Mode.RUNNING
  }

  stop() {
    super.stop()
    this.mode = Mode.IDLE
    this.attackDirection(this.direction)
  }
}
