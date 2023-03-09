import Game from "./game/game"

class App {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  game: Game
  width: number
  height: number

  constructor() {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d")!
    this.game = new Game(this.context)
  }

  start() {
    document.body.appendChild(this.canvas)
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
    this.animate()
  }

  private animate(time = 0) {
    this.game.animate(time)

    requestAnimationFrame(this.animate.bind(this))
  }

  private resize() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.game.resize(this.width, this.height)
  }
}

new App().start()
