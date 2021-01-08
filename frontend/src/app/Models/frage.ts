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

  constructor(){
    this.antworten = [new Antwort]
    this.antworten.splice(0)
    this.anzahlAntworten = new Array(1)
    this.showOptions = false
  }
}
