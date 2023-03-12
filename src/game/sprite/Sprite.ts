export default class Sprite {
  frameIndex = 0
  time = 0
  framesPerRow: number
  imageLoaded = false

  constructor(
    private image: HTMLImageElement,
    private frameWidth: number,
    private frameHeight: number,
    private framesPerSecond = 60,
  ) {
    this.image.onload = () => {
      this.imageLoaded = true
      this.framesPerRow = Math.floor(image.width / frameWidth)
    }
  }

  update(dt: number) {
    this.time += dt
    while (this.time > 1000/this.framesPerSecond) {
      this.time -= 1000/this.framesPerSecond
      this.frameIndex++
      if (this.frameIndex >= this.framesPerRow * Math.floor(this.image.height / this.frameHeight)) {
        this.frameIndex = 0
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    if (!this.imageLoaded) return

    const row = Math.floor(this.frameIndex / this.framesPerRow)
    const col = this.frameIndex % this.framesPerRow
    ctx.drawImage(
      this.image,
      col * this.frameWidth,
      row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth,
      this.frameHeight
    )
  }
}
