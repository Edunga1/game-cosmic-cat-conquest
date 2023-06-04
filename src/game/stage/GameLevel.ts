import CirclingTriangle from "../characters/CirclingTriangle"
import Game from "../Game"

export default class GameLevel {
  private maxEnemies = 50
  private currentLevel = 1

  constructor(
    private game: Game,
  ) {
  }

  update(): void {
    this.createEnemy()
  }

  private createEnemy() {
    this.updateCurrentLevel()

    if (!this.game.player) return
    if (this.game.player.enemies.length >= this.maxEnemies) return

    this.createEnemyByLevel()
  }

  private updateCurrentLevel() {
    this.currentLevel = Math.floor(this.game.lifeTime / 10000) + 1
  }

  private createEnemyByLevel() {
    const enemy = new CirclingTriangle(this.game.context)

    if (this.currentLevel >= 3) {
      enemy.addGreen()
    } else if (this.currentLevel >= 2) {
      enemy.addBlue()
    }

    this.game.createEnemy(enemy)
  }
}
