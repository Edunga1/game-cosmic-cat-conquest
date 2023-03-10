import Point from "./core/point"
import Mobile from "./mobile/Mobile"
import Space from "./space/Space"

export default class Game {
  width = 0
  height = 0
  space: Space
  player: Mobile
  enemies: Mobile[] = []

  constructor(
    private context: CanvasRenderingContext2D,
  ) {
    this.space = new Space(context)
    this.player = new Mobile(context)

    for (let i = 0; i < 10; i++) {
      const enemy = new Mobile(context)
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
    this.space.animate(time)

    // render mobiles relative to player
    this.context.save()
    // player
    this.context.translate(this.width / 2, this.height / 2)
    this.player.animate(time)

    // enemies
    this.enemies.forEach(enemy => {
      this.context.translate(
        this.player.position.x + enemy.position.x,
        this.player.position.y + enemy.position.y,
      )
      enemy.animate(time)
    })
    this.context.restore()
  }

  movePlayer(x: number, y: number) {
    const point = new Point(x, y)
    const center = new Point(this.width / 2, this.height / 2)
    const distance = center.subtract(point).unit()
    this.player.position = this.player.position.add(distance)
  }

  stopPlayer() {
    console.log("stop")
  }
}
