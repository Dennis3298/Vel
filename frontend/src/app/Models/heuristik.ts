import Frage from "./frage"

export default class Heuristik{
  _heuristikId: String
  _fragebogenId: String
  fragen: [Frage]
  titel: String

  constructor(){
    this.fragen = [new Frage]
    this.fragen.splice(0)
  }

}
