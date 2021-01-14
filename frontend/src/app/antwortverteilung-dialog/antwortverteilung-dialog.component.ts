import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Output, EventEmitter} from '@angular/core';
import {FragebogenService} from '../fragebogen.service'
import Frage from '../Models/frage';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-antwortverteilung-dialog',
  templateUrl: './antwortverteilung-dialog.component.html',
  styleUrls: ['./antwortverteilung-dialog.component.scss']
})
export class AntwortverteilungDialogComponent implements OnInit {

  verteilung: Array<Object>

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fragebogenService: FragebogenService,
              public matDialogRef: MatDialogRef<AntwortverteilungDialogComponent>) {

  }

  ngOnInit(): void {
    this.verteilung = this.data.verteilung
    console.log(this.verteilung)
    this.initStatistik()
  }

  initStatistik(){
    this.chartDatasets[0].data[0] = this.verteilung[0]['count']
    this.chartDatasets[0].data[1] = this.verteilung[1]['count']
    this.chartDatasets[0].data[2] = this.verteilung[2]['count']
    this.chartDatasets[0].data[3] = this.verteilung[3]['count']
    this.chartDatasets[0].data[4] = this.verteilung[4]['count']
    this.chartDatasets[0].data[5] = this.verteilung[5]['count']
    this.chartDatasets[0].data[6] = this.verteilung[6]['count']
    this.chartDatasets[0].data[7] = this.verteilung[7]['count']
  }

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0]}
  ];

  public chartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', 'k.A.'];

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

}
