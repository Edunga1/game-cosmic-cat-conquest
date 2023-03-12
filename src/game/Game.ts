import Cat from "./characters/Cat"
import CirclingTriangle from "./characters/CirclingTriangle"
import Point from "./core/Point"
import Mobile from "./mobile/Mobile"
import Space from "./space/Space"

export default class Game {
  width = 0
  height = 0
  lastTime = 0
  delta = 0
  space: Space
  player: Mobile
  enemies: Mobile[] = []

  constructor(
    private context: CanvasRenderingContext2D,
  ) {
    this.space = new Space(context)
    this.player = new Cat(context)

    for (let i = 0; i < 10; i++) {
      const enemy = new CirclingTriangle(context)
      enemy.position.x = Math.random() * 1000 - 500
      enemy.position.y = Math.random() * 1000 - 500
      this.enemies.push(enemy)
    }
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.space.width = width
    this.space.height = height
  }

  animate(time: number) {
    this.updateDelta(time)
    this.space.animate(this.delta)
    this.updatePlayer()
    this.updateEnemies()
    this.context.restore()
  }

  movePlayer(x: number, y: number) {
    const point = new Point(x, y)
    const center = new Point(this.width / 2, this.height / 2)
    const distance = center.subtract(point)
    this.player.move(distance)
  }

  stopPlayer() {
    this.player.velocity = Point.zero()
  }

  private updatePlayer() {
    this.context.save()
    this.context.translate(this.width / 2, this.height / 2)
    this.player.animate(this.delta)
    this.context.restore()
  }

  private updateEnemies() {
    this.enemies.forEach(enemy => {
      this.context.save()
      this.context.translate(
        this.width / 2 + this.player.position.x + enemy.position.x,
        this.height / 2 + this.player.position.y + enemy.position.y,
      )
      enemy.animate(this.delta)
      this.context.restore()
    })
  }

  private updateDelta(time: number) {
    this.delta = time - this.lastTime
    this.lastTime = time
  }
}
