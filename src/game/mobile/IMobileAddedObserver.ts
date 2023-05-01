import Mobile from "./Mobile"

export default interface IMobileAddedObserver {
  onMobileAdded(mobile: Mobile): void
}
