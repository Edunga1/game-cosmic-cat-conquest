export default class Attributes {
  public hp = NumericAttribute.of(100)

  constructor(
    hp: number,
    public power = 0,
  ) {
    this.hp = NumericAttribute.of(hp)
  }

  damage(source: Attributes) {
    this.hp.value -= source.power
  }
}

class NumericAttribute {
  constructor(
    public value: number,
    public max: number,
  ) { }

  static of(value: number) {
    return new NumericAttribute(value, value)
  }

  setMax(max: number) {
    this.value = Math.min(this.value, max)
    this.max = max
  }
}
