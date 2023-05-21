import Game from "../Game";

export default class GameLevel {
  constructor(
    private game: Game,
  ) {
  }

  update(): void {
    this.createEnemy()
  }

  private createEnemy() {
    if (!this.game.player) return
    if (this.game.player.enemies.length >= 10) return
    this.game.createEnemy()
  }
}
