import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FragebogenService } from '../fragebogen.service';
import Fragebogen from '../Models/fragebogen';
import Heuristik from '../Models/heuristik';

@Component({
  selector: 'app-fragebogen-liste',
  templateUrl: './fragebogen-liste.component.html',
  styleUrls: ['./fragebogen-liste.component.scss']
})
export class FragebogenListeComponent implements OnInit {

  fragebogenList: Array<Fragebogen>
  selectedOption: string

  liste: Array<Object>

  enableButtons: boolean = true
  selectedFragebogen: string

  constructor(private fragebogenService: FragebogenService,
              private router: Router,
              private route: ActivatedRoute) {
    this.getFrageboegen()
  }

  ngOnInit(): void {
  }

  getFrageboegen(){
    this.fragebogenList = new Array
    this.fragebogenList.splice(0)

    this.fragebogenService.getFrageboegen()
      .subscribe((fragebogen:Array<Fragebogen>) => {
        fragebogen.forEach(fragebogen => {
          console.log(fragebogen.datum)
          fragebogen.show = true
          this.fragebogenList.push(fragebogen)
        });
      },
      (error) => {
        alert("Ein Fehler ist aufgetreten: " + error)
      })
    console.log(this.fragebogenList)
  }

  onChangeSelectedValue($event){
    this.selectedOption = $event.target.options[$event.target.options.selectedIndex].value;
    console.log(this.selectedOption)
  }

  onSubmitFilter(value: string){

    this.selectedFragebogen = ""
    this.enableButtons = true;

    if(this.selectedOption == "1"){
      this.fragebogenList.forEach(fragebogen => {
        if(!fragebogen.titel.includes(value)){
          fragebogen.show = false
        }else fragebogen.show = true
        if(value == "") fragebogen.show = true
      });
    }
    else if(this.selectedOption == "2"){
      this.fragebogenList.forEach(fragebogen => {
        if(!fragebogen.interviewerFirstName.includes(value) && !fragebogen.interviewerLastName.includes(value) ){
          fragebogen.show = false
        }else fragebogen.show = true
        if(value == "") fragebogen.show = true
      });
    }
    else if(this.selectedOption == "3"){
      this.fragebogenList.forEach(fragebogen => {
        if(!fragebogen.heuristiken.includes(value)){
          fragebogen.show = false
        }else fragebogen.show = true
        if(value == "") fragebogen.show = true
      });
    }
    else{
      this.fragebogenList.forEach(fragebogen => {
        fragebogen.show = true
      });
    }
  }

  onRowDblClick(fragebogenId: string){
    let heuristikList: Array<Heuristik>
    heuristikList = new Array
    heuristikList.splice(0)

    this.fragebogenService.getHeuristiken(fragebogenId)
    .subscribe((heuristiken:Array<Heuristik>) => {
      heuristiken.forEach(heuristik => {
        heuristikList.push(heuristik)
      });
      this.router.navigate(['/auswertung', fragebogenId], {state: {heuristikList}})
    },
    (error) => {
      alert("Ein Fehler ist aufgetreten: " + error)
    })
  }

  onRowClick(fragebogen: Fragebogen){
    this.selectedFragebogen = fragebogen._id.toString()
    this.enableButtons = false;
  }


  onDeleteClick(fragebogenId: string){
    if(confirm("Soll der Fragebogen wirklich gelöscht werden?")) {
        this.fragebogenService.deleteFragebogen(fragebogenId)  .subscribe(
          result => {
            // Handle result
            console.log(result)
          },
          error => {

          },
          () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
            alert("Fragebogen erfolgreich gelöscht!")
            this.getFrageboegen()
          }
        );
      }
  }


  onEditClick(fragebogenId: string){
    let heuristikList: Array<Heuristik>
    heuristikList = new Array
    heuristikList.splice(0)

    this.fragebogenService.getHeuristiken(fragebogenId)
    .subscribe((heuristiken:Array<Heuristik>) => {
      heuristiken.forEach(heuristik => {
        heuristikList.push(heuristik)
      });
      this.router.navigate(['/frageboegen', fragebogenId], {state: {heuristikList}})
    },
    (error) => {
      alert("Ein Fehler ist aufgetreten: " + error)
    })
  }

}
