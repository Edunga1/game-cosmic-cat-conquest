import Cat from "./characters/Cat"
import CirclingTriangle from "./characters/CirclingTriangle"
import TargetPoint from "./characters/TargetPoint"
import Point from "./core/math/Point"
import ConfettiEffect from "./effects/ConfettiEffect"
import Mobile from "./mobile/Mobile"
import Space from "./space/Space"
import GameLevel from "./stage/GameLevel"

export default class Game {
  options = {
    showCoordinates: false,
  }
  width = 0
  height = 0
  lastTime = 0
  delta = 0
  space: Space
  player: Mobile
  targetPoint: TargetPoint
  mobiles: Mobile[] = []
  gameLevel = new GameLevel(this)

  constructor(
    private context: CanvasRenderingContext2D,
  ) {
    this.space = new Space(this.context)
    this.player = new Cat(this.context)
    this.targetPoint = new TargetPoint(this.context, this.player)
    this.mobiles.push(this.targetPoint)
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.space.width = width
    this.space.height = height
  }

  animate(time: number) {
    this.updateDelta(time)
    this.updateGameLevel()
    this.updateNonPlayerMobiles()
    this.updatePlayer()
    this.context.restore()
    this.processGameOver()
  }

  movePlayer(x: number, y: number) {
    const distance = new Point(x, y)
    this.player.move(distance)
    this.targetPoint.position = this.player.position.add(distance)
    this.targetPoint.setVisible(true)
  }

  stopPlayer() {
    this.player.stop()
    this.targetPoint.setVisible(false)
    this.createCatAttackEffect()
  }

  getSummary() {
    return `
      Player:
        * pos: ${this.player.position.x}, ${this.player.position.y}
        * hp : ${this.player.attributes.hp.value} / ${this.player.attributes.hp.max}
      Mobiles: ${this.mobiles.length}
    `
  }

  createEnemy() {
    const enemy = new CirclingTriangle(this.context)
    enemy.position = this.player.position.around(Math.random() * 200 + 400)
    enemy.enemies.add(this.player)
    this.player.enemies.add(enemy)
    this.mobiles.push(enemy)
  }

  private reset() {
    this.mobiles = []
    this.player = new Cat(this.context)
    this.targetPoint = new TargetPoint(this.context, this.player)
    this.mobiles.push(this.targetPoint)
  }

  private processGameOver() {
    if (this.player.isAlive) {
      return
    }
    this.reset()
  }

  private updatePlayer() {
    this.context.save()
    this.context.translate(this.width / 2, this.height / 2)
    this.player.animate(this.delta)
    this.drawCoordinates(this.player, 20)
    this.context.restore()
  }

  private updateNonPlayerMobiles() {
    this.space.animate(this.delta)
    const aliveMobiles = this.mobiles.filter(mobile => mobile.isAlive)
    aliveMobiles.forEach(enemy => {
      this.context.save()
      this.context.translate(
        this.width / 2 - this.player.position.x + enemy.position.x,
        this.height / 2 - this.player.position.y + enemy.position.y,
      )
      enemy.animate(this.delta)
      this.drawCoordinates(enemy, 10, 5)
      this.context.restore()
    })
  }

  private updateGameLevel() {
    this.gameLevel.update()
  }

  private updateDelta(time: number) {
    this.delta = time - this.lastTime
    this.lastTime = time
  }

  private createCatAttackEffect() {
    const effect = new ConfettiEffect(this.context)
    effect.position = this.player.position
    effect.direction = this.player.direction
    effect.onLifetimeEnd = () => {
      this.mobiles.splice(this.mobiles.indexOf(effect), 1)
    }
    this.mobiles.push(effect)
  }

  private drawCoordinates(mobile: Mobile, margin: number, size = 8) {
    if (!this.options.showCoordinates || !mobile.isLiving) {
      return
    }
    this.context.fillStyle = "white"
    this.context.font = `${size}px Arial`
    const text = `${Math.round(mobile.position.x)}, ${Math.round(mobile.position.y)}`
    const left = text.length / 4 * size
    this.context.fillText(text, -left, margin)
  }
}
