import Point from "../core/Point"
import Mobile from "../mobile/Mobile"

export default class TargetPoint extends Mobile {
  private visible = true

  constructor(
    context: CanvasRenderingContext2D,
    private source: Mobile,
  ) {
    super(context)
  }

  setVisible(visible: boolean) {
    this.visible = visible
  }

  render() {
    if (!this.visible) {
      return
    }
    const dist = this.source.position.subtract(this.position)
    this.context.beginPath()
    this.context.moveTo(0, 0)
    this.context.lineTo(dist.x, dist.y)
    this.context.strokeStyle = '#FFF'
    this.context.setLineDash([5, 15])
    this.context.stroke()
  }

  moveTo(position: Point) {
    super.moveTo(position)
  }
}
