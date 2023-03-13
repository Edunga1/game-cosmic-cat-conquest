import Point from "./game/core/Point"
import Game from "./game/Game"

export class App {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    game: Game
    width: number
    height: number
    keys: string[] = []

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
        document.addEventListener("keydown", this.onKeyDown.bind(this))
        document.addEventListener("keyup", this.onKeyUp.bind(this))
    }

    private onMouseDown(event: MouseEvent) {
        this.game.movePlayerDirection(
            ...this.calculateDirection(event.clientX, event.clientY)
        )
    }

    private onMouseMove(event: MouseEvent) {
        if (event.buttons === 0)
            return
        this.game.movePlayerDirection(
            ...this.calculateDirection(event.clientX, event.clientY)
        )
    }

    private onTouchStart(event: TouchEvent) {
        this.game.movePlayerDirection(
            ...this.calculateDirection(event.touches[0].clientX, event.touches[0].clientY)
        )
    }

    private onTouchEnd() {
        this.game.stopPlayer()
    }

    private calculateDirection(x: number, y: number): [number, number] {
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
            this.game.stopPlayer()
            return
        }
        const sum = this.keys.reduce((sum, key) => {
            return [sum[0] + App.KEY_TO_DIRECTION[key][0], sum[1] + App.KEY_TO_DIRECTION[key][1]]
        }, [0, 0])
        this.game.movePlayerDirection(sum[0], sum[1])
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

new App().start()
