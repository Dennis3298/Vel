import Teilnehmer from "./teilnehmer"
import {formatDate} from '@angular/common';

export default class Fragebogen{
  _id: String
  titel: String
  interviewerFirstName: String
  interviewerLastName: String
  datum: Date
  heuristiken: [String]
  teilnehmer: Teilnehmer
  show: boolean

  constructor(){
    this.datum = new Date()
    this.show = true;
  }
}
