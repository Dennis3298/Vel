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

  constructor(private fragebogenService: FragebogenService, private router: Router) {
    this.fragebogen = new Fragebogen()
    this.fragebogen.heuristiken = [new String]
    this.teilnehmer = new Teilnehmer()

  }

  //Methode schnappt sich den User-input und speicher diesen innerhalb der entsprechenden Properties von fragebogen und teilnehmer ab
  //hierbei wird komposition verwendet in dem teilnehmer (ein eigenes Objekt einer eigenen Klasse) ein Property von fragebogen darstellt
  onWeiterClick(interviewerFirstName, interviewerLastName
    ,titel, age, male, female, diverse, heu1, heu2, heu3, heu4, heu5){

      this.fragebogen.interviewerFirstName = interviewerFirstName.value
      this.fragebogen.interviewerLastName = interviewerLastName.value
      this.fragebogen.titel = titel.value
      this.teilnehmer.age = age.value
      if(male.value){
        this.teilnehmer.geschlecht = "MÄNNLICH"
      }
      else if(female.value){
        this.teilnehmer.geschlecht = "WEIBLICH"
      }
      else if(diverse.value){
        this.teilnehmer.geschlecht = "DIVERS"
      }

      this.fragebogen.teilnehmer = this.teilnehmer

      this.fragebogen.heuristiken.splice(0)
      this.checkForHeuristik(heu1, "HEU1")
      this.checkForHeuristik(heu2, "HEU2")
      this.checkForHeuristik(heu3, "HEU3")
      this.checkForHeuristik(heu4, "HEU4")
      this.checkForHeuristik(heu5, "HEU5")

      console.log(this.fragebogen)

      this.fragebogenService.createFragebogen(this.fragebogen)
      .subscribe((fragebogen: Fragebogen) => this.router.navigate(['/frageboegen', fragebogen._id]))
  }

  checkForHeuristik(isHeuristik, heuristikId){
    if(isHeuristik.checked){
      this.fragebogen.heuristiken.push(heuristikId)
    }
  }

  ngOnInit(): void {
  }

}
