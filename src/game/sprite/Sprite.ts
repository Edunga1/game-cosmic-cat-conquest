import Point from "../core/math/Point"

export default class Sprite {
  frameIndex = 0
  time = 0
  framesPerRow = 0
  imageLoaded = false
  loopCount = 0

  constructor(
    private image: HTMLImageElement,
    private frameWidth: number,
    private frameHeight: number,
    private framesPerSecond = 60,
    private loop = true,
  ) {
    this.image.onload = () => {
      this.imageLoaded = true
      this.framesPerRow = Math.floor(image.width / frameWidth)
    }
  }

  update(dt: number) {
    if (!this.checkLoop()) return
    this.time += dt
    while (this.time > 1000/this.framesPerSecond) {
      this.time -= 1000/this.framesPerSecond
      this.frameIndex++
      if (this.frameIndex >= this.framesPerRow * Math.floor(this.image.height / this.frameHeight)) {
        this.frameIndex = 0
        this.loopCount++
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: Point = Point.zero(),
  ) {
    if (!this.checkLoop()) return
    if (!this.imageLoaded) return

    const row = Math.floor(this.frameIndex / this.framesPerRow)
    const col = this.frameIndex % this.framesPerRow
    // sprite is facing left by default
    const flip = direction.x < 0 ? 1 : -1

    ctx.save()
    ctx.scale(flip, 1)
    ctx.drawImage(
      this.image,
      col * this.frameWidth,
      row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x - this.frameWidth / 2,
      y - this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight
    )
    ctx.restore()
  }

  private checkLoop(): boolean {
    return this.loop || this.loopCount === 0
  }
}
