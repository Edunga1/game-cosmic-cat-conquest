import Point from "../core/math/Point"

export default class Space {
  width = 0
  height = 0
  starElapsed = 0
  backgroundColor = "rgb(10, 10, 10)"
  stars: Point[] = []
  initialStars = 100
  maxStars = 400

  constructor(
    private context: CanvasRenderingContext2D
  ) {
    for (let i = 0; i < this.initialStars; i++) {
      this.createStar()
    }
  }

  animate(delta: number) {
    this.render(delta)
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.stars.forEach(star => {
      star.x = Math.random() * width
      star.y = Math.random() * height
    })
  }

  createStar() {
    this.stars.push(new Point(
      Math.random() * this.width,
      Math.random() * this.height,
    ))
  }

  private render(delta: number) {
    this.renderBackground()
    this.renderStars()

    if (this.checkStarElapsed(delta)) {
      this.updateStars(delta)
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

  private updateStars(delta: number) {
    this.stars.forEach(star => {
      star.x += (Math.random() - .5) * delta
      star.y += (Math.random() - .5) * delta
    })
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
