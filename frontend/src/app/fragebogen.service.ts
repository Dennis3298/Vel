import { Injectable } from '@angular/core';
import { WebService } from './web.service';

import Fragebogen from './Models/fragebogen';
import Heuristik from './Models/heuristik';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FragebogenService {

  constructor(private webService: WebService) { }

  getFrageboegen(){
    return this.webService.get('frageboegen')
  }

  createFragebogen(fragebogen: Fragebogen){
    return this.webService.post('frageboegen', {
        titel: fragebogen.titel,
        interviewerFirstName: fragebogen.interviewerFirstName,
        interviewerLastName: fragebogen.interviewerLastName,
        teilnehmer: fragebogen.teilnehmer,
        heuristiken: fragebogen.heuristiken,
        datum: new Date()
    })
  }

  createHeuristik(heuristikList: Heuristik[], fragebogenId: string){
    const posts = new Array
    heuristikList.forEach(heuristik => {
          posts.push(this.webService.post(`frageboegen/${fragebogenId}/heuristiken`, {
          _heuristikId: heuristik._heuristikId,
          _fragebogenId: fragebogenId,
          fragen: heuristik.fragen,
          titel: heuristik.titel
        }))
    });
    return forkJoin(posts)

  }

}
