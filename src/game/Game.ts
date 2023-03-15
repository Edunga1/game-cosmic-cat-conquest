import Cat from "./characters/Cat"
import CirclingTriangle from "./characters/CirclingTriangle"
import TargetPoint from "./characters/TargetPoint"
import Point from "./core/Point"
import ConfettiEffect from "./effects/ConfettiEffect"
import Mobile from "./mobile/Mobile"
import Space from "./space/Space"

export default class Game {
  width = 0
  height = 0
  lastTime = 0
  delta = 0
  space: Space
  player: Mobile
  targetPoint: TargetPoint
  mobiles: Mobile[] = []

  constructor(
    private context: CanvasRenderingContext2D,
  ) {
    this.space = new Space(context)
    this.player = new Cat(context)
    this.targetPoint = new TargetPoint(context, this.player)
    this.mobiles.push(this.targetPoint)

    for (let i = 0; i < 10; i++) {
      const enemy = new CirclingTriangle(context)
      enemy.position.x = Math.random() * 1000 - 500
      enemy.position.y = Math.random() * 1000 - 500
      this.mobiles.push(enemy)
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
    this.updateNonPlayerMobiles()
    this.updatePlayer()
    this.context.restore()
  }

  movePlayer(x: number, y: number) {
    const distance = new Point(x, y)
    this.player.move(distance)
    this.targetPoint.moveTo(this.player.position.add(distance))
    this.targetPoint.setVisible(true)
  }

  stopPlayer() {
    this.player.stop()
    this.targetPoint.setVisible(false)
    this.createCatAttackEffect()
  }

  private updatePlayer() {
    this.context.save()
    this.context.translate(this.width / 2, this.height / 2)
    this.player.animate(this.delta)
    this.context.restore()
  }

  private updateNonPlayerMobiles() {
    this.space.animate(this.delta)
    this.mobiles.forEach(enemy => {
      this.context.save()
      this.context.translate(
        this.width / 2 - this.player.position.x + enemy.position.x,
        this.height / 2 - this.player.position.y + enemy.position.y,
      )
      enemy.animate(this.delta)
      this.context.restore()
    })
  }

  private updateDelta(time: number) {
    this.delta = time - this.lastTime
    this.lastTime = time
  }

  private createCatAttackEffect() {
    const effect = new ConfettiEffect(this.context)
    effect.position = this.player.position
    effect.onLifetimeEnd = () => {
      this.mobiles.splice(this.mobiles.indexOf(effect), 1)
    }
    this.mobiles.push(effect)
  }
}
