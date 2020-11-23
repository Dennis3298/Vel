import { Component, OnInit } from '@angular/core';
import Fragebogen from '../Models/fragebogen';
import Heuristik from '../Models/heuristik';
import Frage from '../Models/frage';
import Antwort from '../Models/antwort';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { FragebogenService } from '../fragebogen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-heuristik',
  templateUrl: './heuristik.component.html',
  styleUrls: ['./heuristik.component.scss']
})
export class HeuristikComponent implements OnInit {

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

  fragebogen: Fragebogen
  fragenA: [String]
  buttonsCounter: Object
  frageAntwort: Antwort

  fragebogenId: string
  routeSub: Subscription
  constructor(
      private fragebogenService: FragebogenService,
      private router: Router,
      private route: ActivatedRoute,

    ) {

    //benötigte Objekte initialisieren
    this.fragebogen = new Fragebogen
    this.fragebogen = history.state.fragebogen
    this.heuristikList = new Array
    this.heuristikList.splice(0)


    this.buttonsCounter = new Object
    this.buttonsCounter =
    [
      { id: 1, label: '1'},
      { id: 2, label: '2'},
      { id: 3, label: '3'},
      { id: 4, label: '4'},
      { id: 5, label: '5'},
      { id: 6, label: '6'},
      { id: 7, label: '7'},
      { id: 0, label: 'k.A.'}
    ]

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

    if(this.fragebogen.heuristiken.includes("HEU1")){
      //Fragen für Heuristik A
      this.HeuristikA = new Heuristik

      this.fragenHeuristikA = [new Frage]
      this.fragenHeuristikA.splice(0)

      //Fragen-Array-Objekt von HeuristikA setzen, sonst undefined
      this.HeuristikA.fragen = this.fragenHeuristikA
      this.HeuristikA._heuristikId = "HEU1"
      this.HeuristikA.titel = "Nachvollziehbarkeit und Feedback zur Aufgabenbearbeitung"

      let idSuffix: number = 1
      this.fragenA.forEach(element => {
          this.frageHeuristikA = new Frage
          this.frageHeuristikA.frage = element
          this.frageHeuristikA._frageId = "F" + idSuffix
          idSuffix++
          this.HeuristikA.fragen.push(this.frageHeuristikA)
      });
      this.heuristikList.push(this.HeuristikA)
    }

    if(this.fragebogen.heuristiken.includes("HEU2")){
      //Fragen für Heuristik B
      this.HeuristikB = new Heuristik

      this.fragenHeuristikB = [new Frage]
      this.fragenHeuristikB.splice(0)

      this.HeuristikB.fragen = this.fragenHeuristikB
      this.HeuristikB._heuristikId = "HEU2"
      this.HeuristikB.titel = "Von der Flexibilität der Vorgehensweisen zur gemeinsamen Weiterentwicklung des Systems"

      let idSuffix: number = 1
      this.fragenA.forEach(element => {
          this.frageHeuristikB = new Frage
          this.frageHeuristikB.frage = element
          this.frageHeuristikB._frageId = "F" + idSuffix
          idSuffix++
          this.HeuristikB.fragen.push(this.frageHeuristikB)
      });
      this.heuristikList.push(this.HeuristikB)
    }

    if(this.fragebogen.heuristiken.includes("HEU3")){
      //Fragen für Heuristik C
      this.HeuristikC = new Heuristik

      this.fragenHeuristikC = [new Frage]
      this.fragenHeuristikC.splice(0)

      this.HeuristikC.fragen = this.fragenHeuristikC
      this.HeuristikC._heuristikId = "HEU3"
      this.HeuristikC.titel = "Kommunikationsunterstützung für Aufgabenbearbeitung und sozialen Austausch"

      let idSuffix: number = 1
      this.fragenA.forEach(element => {
          this.frageHeuristikC = new Frage
          this.frageHeuristikC.frage = element
          this.frageHeuristikC._frageId = "F" + idSuffix
          idSuffix++
          this.HeuristikC.fragen.push(this.frageHeuristikC)
      });
      this.heuristikList.push(this.HeuristikC)
    }

    if(this.fragebogen.heuristiken.includes("HEU4")){
      this.HeuristikD = new Heuristik

      this.fragenHeuristikD = [new Frage]
      this.fragenHeuristikD.splice(0)

      this.HeuristikD.fragen = this.fragenHeuristikD
      this.HeuristikD._heuristikId = "HEU4"
      this.HeuristikD.titel = "Aufgabengebundener Informationsaustausch für die Erleichterung geistiger Arbeit"

      let idSuffix: number = 1
      this.fragenA.forEach(element => {
          this.frageHeuristikD = new Frage
          this.frageHeuristikD.frage = element
          this.frageHeuristikD._frageId = "F" + idSuffix
          idSuffix++
          this.HeuristikD.fragen.push(this.frageHeuristikD)
      });
      this.heuristikList.push(this.HeuristikD)
    }

    if(this.fragebogen.heuristiken.includes("HEU5")){
      //Fragen für Heuristik E
      this.HeuristikE = new Heuristik

      this.fragenHeuristikE = [new Frage]
      this.fragenHeuristikE.splice(0)

      this.HeuristikE.fragen = this.fragenHeuristikE
      this.HeuristikE._heuristikId = "HEU5"
      this.HeuristikE.titel = "Aufgabenorganisation für die Balance zwischen Anstrengung und erlebtem Erfolg"

      let idSuffix: number = 1
      this.fragenA.forEach(element => {
          this.frageHeuristikE = new Frage
          this.frageHeuristikE.frage = element
          this.frageHeuristikE._frageId = "F" + idSuffix
          idSuffix++
          this.HeuristikE.fragen.push(this.frageHeuristikE)
      });
      this.heuristikList.push(this.HeuristikE)
    }

  }



  ngOnInit(): void {
    console.log(this.fragebogenService)

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.fragebogenId = params['id'] //log the value of id
    });
  }

  onTableAddClick(frage: Frage){
    frage.anzahlAntworten = new Array(frage.anzahlAntworten.length+1)
  }

  onButtonSaveClick(){
    console.log(this.heuristikList)
    console.log(this.fragebogenId)

    this.fragebogenService.createHeuristik(this.heuristikList, this.fragebogenId).subscribe(
      (heuristikList: Heuristik[]) => {
        heuristikList = this.heuristikList
        this.router.navigate(['/auswertung', this.fragebogenId], {state: {heuristikList}}
      )})
  }

  onRadiobuttonClick(wert: number, _antwortId: string, frage: Frage){
   let found = false;
   for(let i = 0; i < frage.antworten.length; i++) {
    if (frage.antworten[i]._antwortId == _antwortId) {
        frage.antworten[i].wert = wert
        found = true;
        break;
      }
    }
    if(!found){
      this.frageAntwort = new Antwort
      this.frageAntwort._antwortId = _antwortId
      this.frageAntwort.wert = wert
      frage.antworten.push(this.frageAntwort)
    }
  }

  onTableRemoveClick(frage: Frage){
    if(frage.anzahlAntworten.length > 1){
    frage.anzahlAntworten = new Array(frage.anzahlAntworten.length-1)

    for(let i = 0; i < frage.antworten.length; i++) {
     if (frage.antworten[i]._antwortId == (frage.antworten.length-1).toString()) {
         frage.antworten.splice(i)
         break;
       }
     }
    }
  }

}
