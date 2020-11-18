import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heuristik',
  templateUrl: './heuristik.component.html',
  styleUrls: ['./heuristik.component.scss']
})
export class HeuristikComponent implements OnInit {

  divCounter: number

  fragenHeuristikA: [String]
  fragenHeuristikB: [String]
  fragenHeuristikC: [String]
  fragenHeuristikD: [String]
  fragenHeuristikE: [String]

  constructor() {

    this.divCounter = 0
    this.fragenHeuristikA = [new String]
    this.fragenHeuristikB = [new String]
    this.fragenHeuristikC = [new String]
    this.fragenHeuristikD = [new String]
    this.fragenHeuristikE = [new String]

    //Warum auch immer wird auf Index 0 ein Element mit leerem String gesetzt, folgende Zeilen löschen dieses
    this.fragenHeuristikA.splice(0)
    this.fragenHeuristikB.splice(0)
    this.fragenHeuristikC.splice(0)
    this.fragenHeuristikD.splice(0)
    this.fragenHeuristikE.splice(0)

    //Fragen für Heuristik A
    this.fragenHeuristikA.push("Frage: Das ist Frage A")
    this.fragenHeuristikA.push("Frage: Das ist Frage B")
    this.fragenHeuristikA.push("Frage: Das ist Frage C")

    //Fragen für Heuristik B
    this.fragenHeuristikB.push("Frage: Das ist Frage A")
    this.fragenHeuristikB.push("Frage: Das ist Frage B")
    this.fragenHeuristikB.push("Frage: Das ist Frage C")

    //Fragen für Heuristik C
    this.fragenHeuristikC.push("Frage: Das ist Frage A")
    this.fragenHeuristikC.push("Frage: Das ist Frage B")
    this.fragenHeuristikC.push("Frage: Das ist Frage C")

    //Fragen für Heuristik D
    this.fragenHeuristikD.push("Frage: Das ist Frage A")
    this.fragenHeuristikD.push("Frage: Das ist Frage B")
    this.fragenHeuristikD.push("Frage: Das ist Frage C")

    //Fragen für Heuristik E
    this.fragenHeuristikE.push("Frage: Das ist Frage A")
    this.fragenHeuristikE.push("Frage: Das ist Frage B")
    this.fragenHeuristikE.push("Frage: Das ist Frage C")

    console.log(this.fragenHeuristikA)
  }


  ngOnInit(): void {

  }


  onButtonPrevClick(){
    (this.divCounter -= 1)% 5
  }

  onButtonNextClick(){
    (this.divCounter += 1)% 5
  }

  onButtonSaveClick(){

  }

}
