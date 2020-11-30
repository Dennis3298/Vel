export default class Detailview{
  details: [String]
  frage: String
  frageAntwort: [Number]
  detailNotiz: String
  _heuristikId: String
  _frageId: String
  heuristikTitel: String
  hide: boolean


  constructor(){
    this.details = [new String]
    this.details.splice(0)
    this.frageAntwort = [new Number]
    this.frageAntwort.splice(0)
    this.hide = false
  }
}
