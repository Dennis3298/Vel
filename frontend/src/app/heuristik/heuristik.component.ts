import { Component, OnInit } from '@angular/core';
import Fragebogen from '../Models/fragebogen';
import Heuristik from '../Models/heuristik';
import Frage from '../Models/frage';
import Antwort from '../Models/antwort';


@Component({
  selector: 'app-heuristik',
  templateUrl: './heuristik.component.html',
  styleUrls: ['./heuristik.component.scss']
})
export class HeuristikComponent implements OnInit {

  divCounter: number

  heuristikList: Array<Heuristik>

  HeuristikA: Heuristik
  HeuristikB: Heuristik
  HeuristikC: Heuristik
  HeuristikD: Heuristik
  HeuristikE: Heuristik

  fragenHeuristikA: [Frage]
  frageHeuristikA: Frage
  fragenHeuristikB: [Frage]
  frageHeuristikB: Frage
  fragenHeuristikC: [Frage]
  frageHeuristikC: Frage
  fragenHeuristikD: [Frage]
  frageHeuristikD: Frage
  fragenHeuristikE: [Frage]
  frageHeuristikE: Frage


  antworten: [Antwort]
  antwortenHeuristikA: Antwort
  antwortenHeuristikB: Antwort
  antwortenHeuristikC: Antwort
  antwortenHeuristikD: Antwort
  antwortenHeuristikE: Antwort

  fragebogen: Fragebogen

  fragenA: [String]

  constructor() {

    //benötigte Objekte initialisieren
    this.fragebogen = new Fragebogen
    this.fragebogen = history.state.fragebogen
    this.heuristikList = new Array
    this.heuristikList.splice(0)

    this.fragenA = [new String]
    this.fragenA.splice(0)
    this.fragenA.push("Das ist Frage A")
    this.fragenA.push("Das ist Frage B")
    this.fragenA.push("Das ist Frage C")

    //Bestimmen welche Heuristiken displayed werden
    this.checkForHeuristiken()

    console.log(this.heuristikList)
    console.log(this.fragebogen)
  }


  //Methode zum überprüfen, welche Kategorie bzw. Fragen gerendered werden sollen
  checkForHeuristiken(){



    this.divCounter = 0

    if(this.fragebogen.heuristiken.includes("HEU1")){
      //Fragen für Heuristik A
      this.HeuristikA = new Heuristik

      this.fragenHeuristikA = [new Frage]
      this.fragenHeuristikA.splice(0)

      //Fragen-Array-Objekt von HeuristikA setzen, sonst undefined
      this.HeuristikA.fragen = this.fragenHeuristikA
      this.HeuristikA._heuristikId = "HEU1"

      let idSuffix: number = 1
      this.fragenA.forEach(element => {
          this.frageHeuristikA = new Frage
          this.frageHeuristikA.frage = element
          this.frageHeuristikA._frageId = "F" + idSuffix
          idSuffix++
          this.HeuristikA.fragen.push(this.frageHeuristikA)
      });

      // this.frageHeuristikA._frageId = "F1"
      // this.frageHeuristikA.frage = "Frage: Das ist Frage A"
      // this.HeuristikA.fragen.push(this.frageHeuristikA)

      // this.frageHeuristikA = new Frage
      // this.frageHeuristikA._frageId = "F2"
      // this.frageHeuristikA.frage = "Frage: Das ist Frage B"
      // this.HeuristikA.fragen.push(this.frageHeuristikA)

      // this.frageHeuristikA._frageId = "F3"
      // this.frageHeuristikA.frage = "Frage: Das ist Frage C"
      // this.HeuristikA.fragen.push(this.frageHeuristikA)

      this.heuristikList.push(this.HeuristikA)
    }

    if(this.fragebogen.heuristiken.includes("HEU2")){
      //Fragen für Heuristik B
      this.HeuristikB = new Heuristik
      this.fragenHeuristikB = [new Frage]
      this.HeuristikB.fragen = this.fragenHeuristikB

      this.HeuristikB._heuristikId = "HEU2"
      this.frageHeuristikB = new Frage

      this.frageHeuristikB._frageId = "F1"
      this.frageHeuristikB.frage = "Frage: Das ist Frage A"
      this.HeuristikB.fragen.push(this.frageHeuristikB)

      this.frageHeuristikB._frageId = "F2"
      this.frageHeuristikB.frage = "Frage: Das ist Frage B"
      this.HeuristikB.fragen.push(this.frageHeuristikB)

      this.frageHeuristikB._frageId = "F3"
      this.frageHeuristikB.frage = "Frage: Das ist Frage C"
      this.HeuristikB.fragen.push(this.frageHeuristikB)

      this.heuristikList.push(this.HeuristikB)
    }

    if(this.fragebogen.heuristiken.includes("HEU3")){
      //Fragen für Heuristik C
      this.HeuristikC = new Heuristik
      this.fragenHeuristikC = [new Frage]
      this.HeuristikC.fragen = this.fragenHeuristikC

      this.HeuristikC._heuristikId = "HEU3"
      this.frageHeuristikC = new Frage

      this.frageHeuristikC._frageId = "F1"
      this.frageHeuristikC.frage = "Frage: Das ist Frage A"
      this.HeuristikC.fragen.push(this.frageHeuristikC)

      this.frageHeuristikC._frageId = "F2"
      this.frageHeuristikC.frage = "Frage: Das ist Frage B"
      this.HeuristikC.fragen.push(this.frageHeuristikC)

      this.frageHeuristikC._frageId = "F3"
      this.frageHeuristikC.frage = "Frage: Das ist Frage C"
      this.HeuristikC.fragen.push(this.frageHeuristikC)

      this.heuristikList.push(this.HeuristikC)
    }

    if(this.fragebogen.heuristiken.includes("HEU4")){
      this.HeuristikD = new Heuristik
      this.fragenHeuristikD = [new Frage]
      this.HeuristikD.fragen = this.fragenHeuristikD

      this.HeuristikD._heuristikId = "HEU4"
      this.frageHeuristikD = new Frage

      this.frageHeuristikD._frageId = "F1"
      this.frageHeuristikD.frage = "Frage: Das ist Frage A"
      this.HeuristikD.fragen.push(this.frageHeuristikD)

      this.frageHeuristikD._frageId = "F2"
      this.frageHeuristikD.frage = "Frage: Das ist Frage B"
      this.HeuristikD.fragen.push(this.frageHeuristikD)

      this.frageHeuristikD._frageId = "F3"
      this.frageHeuristikD.frage = "Frage: Das ist Frage C"
      this.HeuristikD.fragen.push(this.frageHeuristikD)

      this.heuristikList.push(this.HeuristikD)
    }

    if(this.fragebogen.heuristiken.includes("HEU5")){
      //Fragen für Heuristik E
      this.HeuristikE = new Heuristik
      this.fragenHeuristikE = [new Frage]
      this.HeuristikE.fragen = this.fragenHeuristikE

      this.HeuristikE._heuristikId = "HEU5"
      this.frageHeuristikE = new Frage

      this.frageHeuristikE._frageId = "F1"
      this.frageHeuristikE.frage = "Frage: Das ist Frage A"
      this.HeuristikE.fragen.push(this.frageHeuristikE)

      this.frageHeuristikE._frageId = "F2"
      this.frageHeuristikE.frage = "Frage: Das ist Frage B"
      this.HeuristikE.fragen.push(this.frageHeuristikE)

      this.frageHeuristikE._frageId = "F3"
      this.frageHeuristikE.frage = "Frage: Das ist Frage C"
      this.HeuristikE.fragen.push(this.frageHeuristikE)

      this.heuristikList.push(this.HeuristikE)
    }

  }



  ngOnInit(): void {

  }


  onButtonPrevClick(){
    (this.divCounter -= 1)% this.fragebogen.heuristiken.length
  }

  onButtonNextClick(){
    (this.divCounter += 1)% this.fragebogen.heuristiken.length
  }

  onButtonSaveClick(){

  }

}
