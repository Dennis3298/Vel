import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core'
import Heuristik from '../Models/heuristik';
import Detailview from '../Models/detailview'


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

  heuristikADetailviewListe: [Detailview]
  heuristikBDetailviewListe: [Detailview]
  heuristikCDetailviewListe: [Detailview]
  heuristikDDetailviewListe: [Detailview]
  heuristikEDetailviewListe: [Detailview]

  detailViewFragen: Array<any>

  constructor() {

      this.heuristikList = new Array
      this.heuristikList = history.state.heuristikList
      console.log(this.heuristikList)
      console.log(this.windowHeight)
      console.log(this.windowWidth)
   }

   public chartType: string = 'bar';

   public chartDatasets: Array<any> = [
     { data: [0, 0, 0, 0, 0, 0, 0]}
   ];

   public chartLabels: Array<any> = ['HEU1', 'HEU2', 'HEU3', 'HEU4', 'HEU5'];

   public chartColors: Array<any> = [
     {
       backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)'
       ],
       borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)'
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


  initAntworten(filterZahl: number){
    let data: any[] = new Array
    let labels: any[] = new Array

    data.splice(0)
    labels.splice(0)

    this.heuristikList.forEach(heuristik => {
     let antwortCounter = 0
       heuristik.fragen.forEach(frage => {
         frage.antworten.forEach(antwort => {
             if(antwort.wert == filterZahl){
               antwortCounter++
             }
         });
       });
       labels.push(heuristik._heuristikId)
       data.push(antwortCounter)
       if(antwortCounter > this.yAchseMaxWert) {
         this.yAchseMaxWert = antwortCounter
         this.chartOptions = {tickst:{max: this.yAchseMaxWert+1}}
       }
   });
   console.log(data)
   this.chartDatasets = [{data: data}]
   this.chartLabels = labels
   console.log(this.chartDatasets)

  }

  onButtonStatistikClick(filterObjekt: any){
    this.initAntworten(filterObjekt.value)
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
      console.log(this.windowHeight)
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth)

      if(this.windowWidth < 900){
        this.chartType = "polarArea"
      }else{
        this.chartType = "bar"
      }
  }
}
