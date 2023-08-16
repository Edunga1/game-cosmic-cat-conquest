import Point from "./game/core/math/Point"
import Game from "./game/Game"

export class App {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  game: Game
  width = 0
  height = 0
  isControllingPlayer = false
  keys: string[] = []

  constructor() {
    this.canvas = document.createElement("canvas")
    const context = this.canvas.getContext("2d")
    if (!context) {
      throw new Error("Could not get canvas context")
    }
    this.context = context
    this.game = new Game(this.context)
  }

  start() {
    document.body.appendChild(this.canvas)
    window.addEventListener("resize", this.resize.bind(this))
    this.registerCanvasEvents()
    this.resize()
    this.registerConsoleCommands()
    requestAnimationFrame(this.animate.bind(this))
  }

  enableDebugMode(): App {
    setInterval(() => {
      console.log(this.game.getSummary())
    }, 3000)
    return this
  }

  private animate(timestamp: number) {
    this.game.animate(timestamp)
    requestAnimationFrame(this.animate.bind(this))
  }

  private resize() {
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.game.resize(this.width, this.height)
  }

  private registerCanvasEvents() {
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this))
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    this.canvas.addEventListener("mouseup", this.onTouchEnd.bind(this))
    this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this))
    this.canvas.addEventListener("touchmove", this.onTouchStart.bind(this))
    this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this))
    document.addEventListener("keydown", this.onKeyDown.bind(this))
    document.addEventListener("keyup", this.onKeyUp.bind(this))
  }

  private registerConsoleCommands() {
    const commands: Record<string, () => void> = {
      "coordinates": () => {
        this.game.options.showCoordinates = !this.game.options.showCoordinates
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.run = (command: string) => {
      const key = Object.keys(commands).find(key => key.startsWith(command))
      if (!key) {
        console.log("No command found")
        return
      }
      console.log(`Executed: ${key}`)
      commands[key]()
    }
  }

  private movePlayer(x: number, y: number) {
    if (this.game.player?.isAlive === false && !this.isControllingPlayer) {
      this.game.reset()
    }
    this.isControllingPlayer = true
    this.game.movePlayer(x, y)
  }

  private endMovePlayer() {
    this.isControllingPlayer = false
    this.game.stopPlayer()
  }

  private onMouseDown(event: MouseEvent) {
    this.movePlayer(
      ...this.calculateDistanceFromCenter(event.clientX, event.clientY)
    )
  }

  private onMouseMove(event: MouseEvent) {
    if (event.buttons === 0)
      return
    this.movePlayer(
      ...this.calculateDistanceFromCenter(event.clientX, event.clientY)
    )
  }

  private onTouchStart(event: TouchEvent) {
    this.movePlayer(
      ...this.calculateDistanceFromCenter(event.touches[0].clientX, event.touches[0].clientY)
    )
  }

  private onTouchEnd() {
    this.endMovePlayer()
  }

  private calculateDistanceFromCenter(x: number, y: number): [number, number] {
    const center = new Point(this.width / 2, this.height / 2)
    const point = new Point(x, y)
    const distance = point.subtract(center)
    return [distance.x, distance.y]
  }

  private onKeyDown(event: KeyboardEvent) {
    if (!(event.key in App.KEY_TO_DIRECTION)) {
      return
    }
    if (this.keys.includes(event.key)) {
      return
    }
    this.keys.push(event.key)
    this.updateKeys()
  }

  private onKeyUp(event: KeyboardEvent) {
    if (!(event.key in App.KEY_TO_DIRECTION)) {
      return
    }
    this.keys = this.keys.filter(key => key !== event.key)
    this.updateKeys()
  }

  private updateKeys() {
    if (this.keys.length === 0) {
      this.endMovePlayer()
      return
    }
    const sum = this.keys.reduce((sum, key) => {
      return [sum[0] + App.KEY_TO_DIRECTION[key][0], sum[1] + App.KEY_TO_DIRECTION[key][1]]
    }, [0, 0])
    this.movePlayer(sum[0], sum[1])
  }

  static KEY_TO_DIRECTION: { [key: string]: [number, number] } = {
    "w": [0, -1],
    "a": [-1, 0],
    "s": [0, 1],
    "d": [1, 0],
    "ArrowUp": [0, -1],
    "ArrowLeft": [-1, 0],
    "ArrowDown": [0, 1],
    "ArrowRight": [1, 0],
  }
}

new App().enableDebugMode().start()
