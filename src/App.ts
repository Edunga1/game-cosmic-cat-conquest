import Game from "./game/Game"

export class App {
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
        this.registerCanvasEvents()
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

    private registerCanvasEvents() {
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this))
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
        this.canvas.addEventListener("mouseup", this.onTouchEnd.bind(this))
        this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this))
        this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this))
    }

    private onMouseDown(event: MouseEvent) {
        this.game.movePlayer(event.clientX, event.clientY)
    }

    private onMouseMove(event: MouseEvent) {
        if (event.buttons === 0)
            return
        this.game.movePlayer(event.clientX, event.clientY)
    }

    private onTouchStart(event: TouchEvent) {
        this.game.movePlayer(event.touches[0].clientX, event.touches[0].clientY)
    }

    private onTouchEnd() {
        this.game.stopPlayer()
    }
}

new App().start()
