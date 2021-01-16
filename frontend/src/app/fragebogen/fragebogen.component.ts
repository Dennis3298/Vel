import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FragebogenService } from '../fragebogen.service';
import Fragebogen from '../Models/fragebogen';
import Teilnehmer from '../Models/teilnehmer';

@Component({
  selector: 'app-fragebogen',
  templateUrl: './fragebogen.component.html',
  styleUrls: ['./fragebogen.component.scss']
})
export class FragebogenComponent implements OnInit {


  private teilnehmer: Teilnehmer
  private fragebogen: Fragebogen
  isNotFilled: boolean
  notFilled: Array<String>

  constructor(private fragebogenService: FragebogenService, private router: Router) {
    this.fragebogen = new Fragebogen
    this.fragebogen.heuristiken = [new String]
    this.teilnehmer = new Teilnehmer

  }

  checkIfFilled(value: string, fragebogenProperty: Object, property: string, art: string){
    if(value.length > 0){
      fragebogenProperty[property] = value
    }else{
      this.isNotFilled = true
      this.notFilled.push(art)
    }
  }

  //Methode schnappt sich den User-input und speicher diesen innerhalb der entsprechenden Properties von fragebogen und teilnehmer ab
  //hierbei wird komposition verwendet in dem teilnehmer (ein eigenes Objekt einer eigenen Klasse) ein Property von fragebogen darstellt
  onWeiterClick(interviewerFirstName, interviewerLastName
    ,titel, age, male, female, diverse, heu1, heu2, heu3, heu4, heu5, heu6, heu7, heu8){
      this.isNotFilled = false
      this.notFilled = new Array
      this.notFilled.splice(0)
      // if(interviewerFirstName != "" || interviewerFirstName != null){
      //   this.fragebogen.interviewerFirstName = interviewerFirstName.value
      // }else{
      //   alert
      // }
      this.checkIfFilled(interviewerFirstName.value, this.fragebogen, "interviewerFirstName", "Vorname des Interviews")
      this.checkIfFilled(interviewerLastName.value, this.fragebogen, "interviewerLastName", "Nachname des Interviews")
      this.checkIfFilled(titel.value, this.fragebogen, "titel", "Titel")
      if(age.value > 16 && age.value < 100){
        this.teilnehmer.age = age.value
      }else{
        this.isNotFilled = true
        alert("Alter bitte zwischen 16 - 100")
        this.notFilled.push("Alter")
      }
      if(male.checked){
        this.teilnehmer.geschlecht = "MÄNNLICH"
      }
      else if(female.checked){
        this.teilnehmer.geschlecht = "WEIBLICH"
      }
      else if(diverse.checked){
        this.teilnehmer.geschlecht = "DIVERS"
      }else{
        this.isNotFilled = true
        this.notFilled.push("Geschlecht")
      }

      this.fragebogen.teilnehmer = this.teilnehmer

      this.fragebogen.heuristiken.splice(0)
      this.checkForHeuristik(heu1, "HEU1")
      this.checkForHeuristik(heu2, "HEU2")
      this.checkForHeuristik(heu3, "HEU3")
      this.checkForHeuristik(heu4, "HEU4")
      this.checkForHeuristik(heu5, "HEU5")
      this.checkForHeuristik(heu6, "HEU6")
      this.checkForHeuristik(heu7, "HEU7")
      this.checkForHeuristik(heu8, "HEU8")
      if(this.fragebogen.heuristiken.length < 1){
        this.notFilled.push("MIN. eine Heuristik")
      }

      console.log(this.fragebogen)
      console.log('Länge:'+this.fragebogen.heuristiken.length)
      if(!this.isNotFilled){

        this.fragebogenService.createFragebogen(this.fragebogen)
        .subscribe((fragebogen: Fragebogen) => this.router.navigate(['/frageboegen', fragebogen._id], {state: {fragebogen} }),
        (error) => {
          alert("Ein Fehler ist aufgetreten: " + error)
        })

      }else{
        let alertString = "Es wurden nicht alle Felder ausgefüllt: "
        this.notFilled.forEach(item => {
            alertString = alertString + item.toString() + "; "
        });
        alert(alertString)
      }
  }

  checkForHeuristik(isHeuristik, heuristikId){
    if(isHeuristik.checked){
      this.fragebogen.heuristiken.push(heuristikId)
    }
  }

  ngOnInit(): void {

  }

}
