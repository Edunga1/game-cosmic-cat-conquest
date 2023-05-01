import IMobileAddedObserver from "./IMobileAddedObserver"
import Mobile from "./Mobile"

export default interface IMobileAddedObservable {
  addObserver(observer: IMobileAddedObserver): void
  notifyMobileAdded(mobile: Mobile): void
}
