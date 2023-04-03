export default class Attributes {
  public hp = NumericAttribute.of(100)
  public size = 1
  public power = 0
  public range = new NumericAttribute(1, 10)
  public attackPeriod = 1000

  damage(source: Attributes) {
    this.hp.value -= source.power
  }
}

class NumericAttribute {
  private _value: number
  private _max: number

  constructor(
    value: number,
    max: number,
  ) {
    this._value = value
    this._max = max
  }

  static of(value: number) {
    return new NumericAttribute(value, value)
  }

  set value(value: number) {
    this._value = value
    this._max = Math.max(value, this._max)
  }

  get value() {
    return this._value
  }

  set max(max: number) {
    this._max = max
    this._value = Math.min(max, this._value)
  }

  get max() {
    return this._max
  }
}
