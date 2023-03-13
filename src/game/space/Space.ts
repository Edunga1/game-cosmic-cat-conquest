import Point from "../core/Point"

export default class Space {
  width: number
  height: number
  starElapsed = 0
  backgroundColor = "rgb(10, 10, 10)"
  starColorRange = 100
  stars: Point[] = []
  maxStars = 400

  constructor(
    private context: CanvasRenderingContext2D
  ) {
  }

  animate(delta: number) {
    this.render(delta)
  }

  private render(delta: number) {
    this.renderBackground()
    this.renderStars()

    if (this.checkStarElapsed(delta)) {
      this.updateStars()
    }
  }

  private renderBackground() {
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, this.width, this.height)
  }

  private renderStars() {
    this.context.fillStyle = "white"
    this.stars.forEach(star => {
      this.context.fillRect(star.x, star.y, 1, 1)
    })
  }

  private updateStars() {
    this.stars = []
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push(new Point(
        Math.random() * this.width,
        Math.random() * this.height,
      ))
    }
  }

  private checkStarElapsed(delta: number) {
    this.starElapsed += delta
    if (this.starElapsed > 200) {
      this.starElapsed = 0
      return true
    }
    return false
  }
}
