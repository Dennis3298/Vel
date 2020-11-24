import { Component, OnInit } from '@angular/core';
import Fragebogen from '../Models/fragebogen';
import Heuristik from '../Models/heuristik';
import Frage from '../Models/frage';
import Antwort from '../Models/antwort';
import { ActivatedRoute, Router } from '@angular/router';
import { FragebogenService } from '../fragebogen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-heuristik',
  templateUrl: './heuristik.component.html',
  styleUrls: ['./heuristik.component.scss']
})
export class HeuristikComponent implements OnInit {

  heuristikList: Array<Heuristik>

  fragebogen: Fragebogen

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


    //Bestimmen welche Heuristiken displayed werden
    this.checkForHeuristiken("HEU1", "Nachvollziehbarkeit und Feedback zur Aufgabenbearbeitung")
    this.checkForHeuristiken("HEU2", "Von der Flexibilität der Vorgehensweisen zur gemeinsamen Weiterentwicklung des Systems")
    this.checkForHeuristiken("HEU3", "Kommunikationsunterstützung für Aufgabenbearbeitung und sozialen Austausch")
    this.checkForHeuristiken("HEU4", "Aufgabengebundener Informationsaustausch für die Erleichterung geistiger Arbeit")
    this.checkForHeuristiken("HEU5", "Aufgabenorganisation für die Balance zwischen Anstrengung und erlebtem Erfolg ")
    this.checkForHeuristiken("HEU6", "Kompatibilität zwischen Anforderungen, Kompetenzentwicklung und Systemeigenschaften")
    this.checkForHeuristiken("HEU7", "Effiziente Organisation der Aufgabenbearbeitung für ganzheitliche Ziele")
    this.checkForHeuristiken("HEU8", "Unterstützende Technik und Ressourcen für produktive und fehlerfreie Arbeit")

    console.log(this.heuristikList)
    console.log(this.fragebogen)
  }


  checkForHeuristiken(_heuristikId: String, titel: String){
    //this.heuristikList.push(this.Heuristik1)
    if(this.fragebogen.heuristiken.includes(_heuristikId)){

            let heuristik = new Heuristik
            heuristik.fragen
            heuristik._heuristikId = _heuristikId
            heuristik.titel = titel

            let idSuffix: number = 1
            let fragen = [new String]
            fragen.splice(0)

            this.fillFragen(fragen , _heuristikId)

            fragen.forEach(element => {
                let frageHeuristik = new Frage
                frageHeuristik.frage = element
                frageHeuristik._frageId = "F" + idSuffix
                idSuffix++
                heuristik.fragen.push(frageHeuristik)
            });
            this.heuristikList.push(heuristik)
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

  fillFragen(fragen: String[], _heuristikId: String){
    switch(_heuristikId){
      case "HEU1":
          fragen.push("Das ist Frage A")
      break

      case "HEU2":
        fragen.push("Das ist Frage B")
      break

      case "HEU3":
        fragen.push("Das ist Frage C")
      break

      case "HEU4":
        fragen.push("Das ist Frage D")
      break

      case "HEU5":
        fragen.push("Das ist Frage E")
      break

      case "HEU6":
        fragen.push("Das ist Frage F")
      break

      case "HEU7":
        fragen.push("Das ist Frage G")
      break

      case "HEU8":
        fragen.push("Das ist Frage H")
      break

    }

  }

}
