export default class Point {
  constructor(
    public x: number,
    public y: number
  ) {
    this.x = x
    this.y = y
  }

  static zero() {
    return new Point(0, 0)
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }

  subtract(point: Point) {
    return new Point(this.x - point.x, this.y - point.y)
  }

  unit() {
    const length = this.length()
    if (length === 0) {
      return Point.zero()
    }
    return new Point(this.x / length, this.y / length)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  multiply(scalar: number) {
    return new Point(this.x * scalar, this.y * scalar)
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  distanceTo(point: Point) {
    return this.subtract(point).length()
  }

  limit(max: number) {
    const length = this.length()
    if (length > max) {
      return this.unit().multiply(max)
    }
    return this
  }

  around(distance: number) {
    const angle = Math.random() * Math.PI * 2
    return new Point(
      this.x + Math.cos(angle) * distance,
      this.y + Math.sin(angle) * distance,
    )
  }
}

