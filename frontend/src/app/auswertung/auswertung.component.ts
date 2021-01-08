import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core'
import Heuristik from '../Models/heuristik';
import Detailview from '../Models/detailview'
import { FragebogenService } from '../fragebogen.service';
import {MatDialog} from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss']
})
export class AuswertungComponent implements OnInit {
  yAchseMaxWert: number = 0
  heuristikList: Array<Heuristik>


  windowHeight: number
  windowWidth: number

  detailviewList: [Detailview[]]

  detailViewFragen: Array<any>
  details: Object

  buttonsCounter: Object
  filterCounter: Array<number>

  routeSub: Subscription
  isInList: boolean

  constructor(private fragebogenService: FragebogenService,
               public dialog: MatDialog,
               private router: Router,
               private route: ActivatedRoute,) {
      this.heuristikList = new Array
      this.heuristikList = history.state.heuristikList
      this.detailviewList = [[new Detailview]]
      this.detailviewList.splice(0)


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
        { id: 8, label: 'k.A.'}
      ]
      this.filterCounter = new Array
      this.filterCounter.splice(0)

      this.initStatistik()
   }

   public chartType: string = 'bar';

   public chartDatasets: Array<any> = [
     { data: [0, 0, 0, 0, 0, 0, 0]}
   ];

   public chartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '0'];

   public chartColors: Array<any> = [
     {
       backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 255, 0, 0.2)',
         'rgba(23, 142, 105, 0.2)',
         'rgba(35, 202, 190, 0.2)'
       ],
       borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 255, 0, 1)',
         'rgba(23, 142, 105, 1)',
         'rgba(35, 202, 190, 1)'
       ],
       borderWidth: 2,
     }
   ];

   public chartOptions: any = {
     responsive: true,
     scales: {
      yAxes: [{
        type: 'linear',
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]}
   };
   public chartClicked(e: any): void { }
   public chartHovered(e: any): void { }

  ngOnInit(): void {
  }

  // ordneInListeEin(detail: Detailview, heuristik: Heuristik, heuristikDetails: Detailview[]){
  //   detail._heuristikId = heuristik._heuristikId
  //   detail.heuristikTitel = heuristik.titel
  //   heuristikDetails.push(detail)
  // }

  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

  initStatistik(){
    let data = [0,0,0,0,0,0,0,0]
    let heuristikDetails: [Detailview]
    heuristikDetails = [new Detailview]
    heuristikDetails.splice(0)
    this.heuristikList.forEach(heuristik => {
       heuristik.fragen.forEach(frage => {
        let isInList = false
         for(let i=1; i<9;i++){
          frage.antworten.forEach(antwort => {
            if(antwort.wert == i){
              data[i-1] += 1
              if(isInList == false){
              let detail: Detailview = new Detailview
              detail.frage = frage.frage
              detail._frageId = frage._frageId
              frage.antworten.forEach(antwort => {
                detail.frageAntwort.push(antwort.wert)
              });
              detail._heuristikId = heuristik._heuristikId
              detail.heuristikTitel = heuristik.titel
              heuristikDetails.push(detail)
              isInList = true
              }
            }
           });
         }
       });
   });
   this.detailviewList.push(heuristikDetails)
   this.chartDatasets = [{data: data}]
  }

  onCheckboxClick(checkBoxValue: number){
    if(this.filterCounter.includes(checkBoxValue)){
      const index = this.filterCounter.indexOf(checkBoxValue);
      if (index > -1) {
        this.filterCounter.splice(index, 1);
      }
    }
    else{
      this.filterCounter.push(checkBoxValue)
    }
    this.detailviewList.forEach(detailview => {
      detailview.forEach(detail => {
        if(this.filterCounter.length > 0){
          // this.filterCounter.forEach(element => {
          //   if(detail.frageAntwort.includes(element)){
          //     detail.hide = true
          //   }else if(!(this.filterCounter.includes(element))){
          //     detail.hide=false
          //   }
          // });
          let oneIncluded = false
          detail.frageAntwort.forEach(element => {
              if(this.filterCounter.includes(element)){
                detail.hide = true
                oneIncluded = true
              }else if(!oneIncluded){
                detail.hide = false
              }
          });
        }else detail.hide=false
      })
    });



  }

  onButtonDetailsClick(detailview: Detailview){
    let getDetails = this.fragebogenService.getDetailview(detailview._frageId.toString(), detailview._heuristikId.toString()).subscribe(
      data => {
        let _fragebogenId
        this.routeSub = this.route.params.subscribe(params => {
          console.log(params) //log the entire params object
          _fragebogenId = params['id'] //log the value of id
        });
          let detailData = data as Object
          let detailFragen = detailData[0].details
          let details = {
            detailFragen: detailFragen,
            heuristikTitel: detailview.heuristikTitel,
            frageTitel: detailview.frage,
            _frageId: detailview._frageId,
            _heuristikId: detailview._heuristikId,
            _fragebogenId: _fragebogenId,
            isFragebogen: false
          }
          this.openDialog(details)
      },
      err => {
        console.log(err);
      })

  }

  @HostListener("window:resize", [])
  public onResize() {
  this.detectScreenSize();
  }

  public ngAfterViewInit() {
      this.detectScreenSize();
  }

  private detectScreenSize() {
      this.windowHeight = window.innerHeight;
      //console.log(this.windowHeight)
      this.windowWidth = window.innerWidth;
      //console.log(this.windowWidth)

      if(this.windowWidth < 900){
        this.chartType = "polarArea"
      }else{
        this.chartType = "bar"
      }
  }

  openDialog(details: Object){
    try{
      const dialogRef = this.dialog.open(DetailDialogComponent, {
        data: {details : details}
      })

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    }catch(e){console.log(e)}
  }
}

