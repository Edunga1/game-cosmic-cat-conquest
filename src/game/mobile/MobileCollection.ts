import Point from "../core/math/Point"
import Mobile from "./Mobile"

export default class MobileCollection {
  collection: Mobile[] = []

  get length() {
    return this.collection.filter(mobile => mobile.isAlive).length
  }

  get first(): Mobile | null {
    return this.collection[0]
  }

  includes(mobile: Mobile) {
    return this.collection.includes(mobile)
  }

  add(mobile: Mobile) {
    this.collection.push(mobile)
  }

  nearestMobilesInRange(position: Point, range: number): Mobile[] {
    return this.collection.filter(mobile => {
      return mobile.isAlive && mobile.position.distanceTo(position) < range
    })
  }
}
