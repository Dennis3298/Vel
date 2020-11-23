import Antwort from "./antwort"

export default class Frage{
  _frageId: String
  frage: String
  antworten: [Antwort]
  anzahlAntworten: number[]
  notiz: String

  constructor(){
    this.antworten = [new Antwort]
    this.antworten.splice(0)
    this.anzahlAntworten = new Array(1)
  }
}
