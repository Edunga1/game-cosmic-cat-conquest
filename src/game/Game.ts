import Cat from "./characters/Cat"
import CirclingTriangle from "./characters/CirclingTriangle"
import TargetPoint from "./characters/TargetPoint"
import Point from "./core/Point"
import ConfettiEffect from "./effects/ConfettiEffect"
import Mobile from "./mobile/Mobile"
import Space from "./space/Space"

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
      enemy.enemies.push(this.player)
      this.player.enemies.push(enemy)
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
    this.attackEnemy()
  }

  getSummary() {
    return `
      Player: ${this.player.position.x}, ${this.player.position.y}
      Mobiles: ${this.mobiles.length}
    `
  }

  private updatePlayer() {
    this.context.save()
    this.context.translate(this.width / 2, this.height / 2)
    this.player.animate(this.delta)
    this.drawCoordinates(this.player, 20)
    this.context.restore()
    this.removeDeadEnemies()
  }

  private removeDeadEnemies() {
    this.mobiles = this.mobiles.filter(mobile => mobile.attributes.hp.value > 0)
  }

  private attackEnemy() {
    const nearestEnemy = this.mobiles
      .filter(mobile => this.player.isOpponent(mobile))
      .find(mobile => mobile.position.distanceTo(this.player.position) < 50)
    if (!nearestEnemy) {
      return
    }
    this.player.attack(nearestEnemy)
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
      this.drawCoordinates(enemy, 10, 5)
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
