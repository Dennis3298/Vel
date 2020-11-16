import { Injectable } from '@angular/core';
import { WebService } from './web.service';

import Fragebogen from './Models/fragebogen';

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

}
