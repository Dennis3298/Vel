import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core'
import Heuristik from '../Models/heuristik';
import Detailview from '../Models/detailview'
import { FragebogenService } from '../fragebogen.service';


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

  constructor(private fragebogenService: FragebogenService) {
      this.heuristikList = new Array
      this.heuristikList = history.state.heuristikList
      this.detailviewList = [[new Detailview]]
      this.detailviewList.splice(0)
   }

   public chartType: string = 'bar';

   public chartDatasets: Array<any> = [
     { data: [0, 0, 0, 0, 0, 0, 0]}
   ];

   public chartLabels: Array<any> = ['HEU1', 'HEU2', 'HEU3', 'HEU4', 'HEU5', 'HEU6', 'HEU7', 'HEU8'];

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
         'rgba(55, 222, 150, 0.2)'
       ],
       borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 255, 0, 0.2)',
         'rgba(23, 142, 105, 0.2)',
         'rgba(55, 222, 150, 0.2)'
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
          max: 0,
          stepSize: 1
        }
      }]}
   };
   public chartClicked(e: any): void { }
   public chartHovered(e: any): void { }

  ngOnInit(): void {
  }

  ordneInListeEin(detail: Detailview, heuristik: Heuristik, heuristikDetails: Detailview[]){
    detail._heuristikId = heuristik._heuristikId
    detail.heuristikTitel = heuristik.titel
    heuristikDetails.push(detail)
  }

  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

  initAntworten(filterZahl: number){
    //zu Beginn alle Detailviews leeren, da diese neu initialisiert werden
    this.clearArray(this.detailviewList)

    let data: any[] = new Array
    let labels: any[] = new Array

    data.splice(0)
    labels.splice(0)

    this.heuristikList.forEach(heuristik => {
     let antwortCounter = 0
     let heuristikDetails = [new Detailview]
     heuristikDetails.splice(0)
       heuristik.fragen.forEach(frage => {
         frage.antworten.forEach(antwort => {
             if(antwort.wert == filterZahl){
               antwortCounter++
               let detail: Detailview = new Detailview
               detail.frage = frage.frage
               detail._frageId = frage._frageId
               this.ordneInListeEin(detail, heuristik, heuristikDetails)
             }
         });
       });
       this.detailviewList.push(heuristikDetails)
       labels.push(heuristik._heuristikId)
       data.push(antwortCounter)
       if(antwortCounter > this.yAchseMaxWert) {
         this.yAchseMaxWert = antwortCounter
         this.chartOptions = {tickst:{max: this.yAchseMaxWert+1}}
       }
   });
   console.log(this.detailviewList)
   this.chartDatasets = [{data: data}]
   this.chartLabels = labels
  }

  onButtonStatistikClick(filterObjekt: any){
    this.initAntworten(filterObjekt.value)
  }

  onButtonDetailsClick(detailview: Detailview){
    //let details: Object
    let getDetails = this.fragebogenService.getDetailview(detailview._frageId.toString(), detailview._heuristikId.toString()).subscribe(
      data => {
          this.details = JSON.stringify(data)
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
}
