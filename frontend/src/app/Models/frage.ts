import Antwort from "./antwort"

export default class Frage{
  _frageId: String
  frage: String
  antworten: [Antwort]
  anzahlAntworten: number[]
  notiz: String
  detailNotiz: String

  //Um für einzelne Frage Optionen einblenden zu können => nur nötig im Client-Modell, nicht relevant für Server etc.
  showOptions: boolean
  standardAntwort: Antwort

  constructor(){
    this.antworten = [new Antwort]
    this.antworten.splice(0)
    this.anzahlAntworten = new Array(1)
    this.showOptions = false
    this.standardAntwort = new Antwort
    this.standardAntwort._antwortId = "0"
    this.standardAntwort.wert = 8
    this.antworten.push(this.standardAntwort)

  }
}
