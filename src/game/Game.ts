import Cat from "./characters/Cat"
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
  lifeTime = 0
  delta = 0
  paused = false
  space?: Space = undefined
  player?: Mobile = undefined
  targetPoint?: TargetPoint = undefined
  mobiles: Mobile[] = []
  gameLevel = new GameLevel(this)
  pausedTitle?: string = undefined
  pausedSubtitle?: string = undefined

  constructor(
    public context: CanvasRenderingContext2D,
  ) {
    this.reset()
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.space?.resize(width, height)
  }

  animate(time: number) {
    this.renderSpace()
    this.renderInterface()

    if (this.paused) {
      this.renderPauseMessage()
      return
    }

    this.updateDelta(time)
    this.updateGameLevel()
    this.updateMobiles()
    this.processGameOver()

    this.renderMobiles()
  }

  movePlayer(x: number, y: number) {
    if (!this.player) return

    const distance = new Point(x, y)
    this.player.move(distance)

    if (!this.targetPoint) return

    this.targetPoint.position = this.player.position.add(distance)
    this.targetPoint?.setVisible(true)
  }

  stopPlayer() {
    this.player?.stop()
    this.targetPoint?.setVisible(false)
    this.createCatAttackEffect()
  }

  getSummary() {
    return `
      Player:
        * pos: ${this.player?.position.x}, ${this.player?.position.y}
        * hp : ${this.player?.attributes.hp.value} / ${this.player?.attributes.hp.max}
        * score: ${this.player?.score}
      Mobiles: ${this.mobiles?.length}
    `
  }

  createEnemy(mobile: Mobile) {
    this.mobiles.push(mobile)

    if (!this.player) return

    mobile.position = this.player?.position.around(Math.random() * 200 + 400)
    mobile.enemies.add(this.player)
    mobile.onDeath.push(this.scoreToPlayer.bind(this))
    mobile.onDeath.push(this.addStarToSpace.bind(this))
    this.player?.enemies.add(mobile)
  }

  pause(title?: string, subtitle?: string) {
    this.pausedTitle = title
    this.pausedSubtitle = subtitle
    this.paused = true
  }

  resume() {
    this.paused = false
  }

  reset() {
    this.mobiles = []
    this.space = new Space(this.context)
    this.space.resize(this.width, this.height)
    this.player = new Cat(this.context)
    this.mobiles.push(this.player)
    this.targetPoint = new TargetPoint(this.context, this.player)
    this.mobiles.push(this.targetPoint)
    this.resume()
  }

  private processGameOver() {
    if (this.player?.isAlive) return
    this.pause("GAME OVER", "Press any key to restart")
  }

  private updateMobiles() {
    this.mobiles.forEach(mobile => mobile.update(this.delta))
  }

  private renderMobiles() {
    const aliveMobiles = this.mobiles.filter(mobile => mobile.isAlive)
    const axis = this.player?.position || new Point(0, 0)
    aliveMobiles.forEach(enemy => {
      this.context.save()
      this.context.translate(
        this.width / 2 - axis.x + enemy.position.x,
        this.height / 2 - axis.y + enemy.position.y,
      )
      enemy.render(this.delta)
      this.drawCoordinates(enemy)
      this.context.restore()
    })
  }

  private updateGameLevel() {
    this.gameLevel.update()
  }

  private updateDelta(time: number) {
    this.delta = time - this.lifeTime
    this.lifeTime = time
  }

  private createCatAttackEffect() {
    if (!this.player) return
    const effect = new ConfettiEffect(this.context)
    effect.position = this.player.position
    effect.direction = this.player.direction
    effect.onLifetimeEnd = () => {
      this.mobiles.splice(this.mobiles.indexOf(effect), 1)
    }
    this.mobiles.push(effect)
  }

  private drawCoordinates(mobile: Mobile) {
    if (!this.options.showCoordinates || !mobile.isLiving) {
      return
    }
    const size = mobile.appearanceSize
    this.context.fillStyle = "white"
    this.context.font = `${size}px Arial`
    const text = `${Math.round(mobile.position.x)}, ${Math.round(mobile.position.y)}`
    const left = text.length / 4 * size
    this.context.fillText(text, -left, size * 2)
  }

  private scoreToPlayer(mobile: Mobile) {
    this.player?.scoreByMobile(mobile)
  }

  private addStarToSpace() {
    this.space?.createStar()
  }

  private renderSpace() {
    if (!this.space) return
    this.space.animate(this.delta)
  }

  private renderInterface() {
    if (!this.player) return
    this.context.save()
    this.context.fillStyle = "white"
    this.context.font = "16px Courier"
    this.context.fillText(this.player.score.toString(), this.width / 2, 20)
    this.context.restore()
  }

  private renderPauseMessage() {
    if (!this.pausedTitle) return
    this.context.save()
    this.context.fillStyle = "white"
    this.context.font = "48px Courier"
    this.context.textAlign = "center"
    const text = this.pausedTitle
    this.context.fillText(text, this.width / 2, this.height / 2)
    this.context.restore()
    if (!this.pausedSubtitle) return
    this.context.save()
    this.context.fillStyle = "white"
    this.context.font = "16px Courier"
    this.context.textAlign = "center"
    const subtitle = this.pausedSubtitle
    this.context.fillText(subtitle, this.width / 2, this.height / 2 + 48)
    this.context.restore()
  }
}
