export default class Space {
  width: number
  height: number
  lastTime: number

  constructor(
    private context: CanvasRenderingContext2D,
  ) {
  }

  animate(time: number) {
    this.render(time)
  }

  private render(time: number) {
    // throttle rendering to 5 fps
    if (time - this.lastTime < 1000 / 5) {
      return
    }
    this.lastTime = time

    // Render background
    this.context.fillStyle = "black"
    this.context.fillRect(0, 0, this.width, this.height)

    // Render stars
    this.context.fillStyle = "white"
    for (let i = 0; i < 100; i++) {
      this.context.fillRect(
        Math.random() * this.width,
        Math.random() * this.height,
        1,
        1,
      )
    }
  }
}
