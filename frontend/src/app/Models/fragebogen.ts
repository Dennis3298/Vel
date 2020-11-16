import Teilnehmer from "./teilnehmer"

export default class Fragebogen{
  _id: String
  titel: String
  interviewerFirstName: String
  interviewerLastName: String
  datum: Date
  heuristiken: [String]
  teilnehmer: Teilnehmer
}

