import Space from "./space/space"

export default class Game {
  space: Space
  width = 0
  height = 0

  constructor(
    context: CanvasRenderingContext2D,
  ) {
    this.space = new Space(context)
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.space.width = width
    this.space.height = height
  }

  animate(time: number) {
    this.space.animate(time)
  }
}
