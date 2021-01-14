import { Injectable } from '@angular/core';
import { WebService } from './web.service';

import Fragebogen from './Models/fragebogen';
import Heuristik from './Models/heuristik';
import { forkJoin, Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import Frage from './Models/frage';

@Injectable({
  providedIn: 'root'
})
export class FragebogenService {

  constructor(private webService: WebService) { }

  getFrageboegen(){
    return this.webService.get('frageboegen')
  }

  deleteFragebogen(fragebogenId: string){
    return this.webService.delete(`frageboegen/${fragebogenId}`)
  }

  deleteHeuristik(fragebogenId: string, heursitikId: string){
    return this.webService.delete(`frageboegen/${fragebogenId}/heuristiken/${heursitikId}`)
  }

  deleteHeuristiken(fragebogenId: string){
    return this.webService.delete(`frageboegen/${fragebogenId}/heuristiken`)
  }

  getHeuristiken(fragebogenId: string){
    return this.webService.get(`frageboegen/${fragebogenId}/heuristiken`)
  }

  createFragebogen(fragebogen: Fragebogen){
    return this.webService.post('frageboegen', {
        titel: fragebogen.titel,
        interviewerFirstName: fragebogen.interviewerFirstName,
        interviewerLastName: fragebogen.interviewerLastName,
        teilnehmer: fragebogen.teilnehmer,
        heuristiken: fragebogen.heuristiken,
        datum: fragebogen.datum
    })
  }

  createHeuristik(heuristikList: Heuristik[], fragebogenId: string){
    const posts = new Array
    console.log(heuristikList)
    heuristikList.forEach(heuristik => {
          posts.push(this.webService.post(`frageboegen/${fragebogenId}/heuristiken`, {
          _heuristikId: heuristik._heuristikId,
          _fragebogenId: fragebogenId,
          fragen: heuristik.fragen,
          titel: heuristik.titel
        }))
    })
    return forkJoin(posts)
  }

  // const addQuery = (req, res, next) => {
  //    req.url = req.url
  // }´

  getDetailview(_frageId: string, _heuristikId: string){
    return this.webService.get('detailview/' + _heuristikId + '/' + _frageId)
  }

  updateHeuristikNotiz(_heuristikId: string, _fragebogenId: string, _frageId: string, updateNotiz: string){
    let url = 'frageboegen/' + _fragebogenId + '/heuristiken/' + _heuristikId + '/' + _frageId
    console.log(url)
    return this.webService.patch(url, {
      detailNotiz: updateNotiz
    } )
  }

  updateHeuritik(heuristikList: Heuristik[]){
    const updates = new Array
    heuristikList.forEach(heuristik => {
      let url = 'frageboegen/' + heuristik._fragebogenId.toString() + '/heuristiken/' + heuristik._heuristikId.toString()
      updates.push(this.webService.patch(url, {
        _heuristikId: heuristik._heuristikId,
        _fragebogenId: heuristik._fragebogenId,
        fragen: heuristik.fragen,
        titel: heuristik.titel
     }))
   })
   return forkJoin(updates)
  }
  ///frageboegen/:fragebogenId/heuristiken/:heuristikId/:frageId'

}
