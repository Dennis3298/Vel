import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly ROOT_URL: String
  constructor(private http: HttpClient) {

   }

  get(uri: String){
     return this.http.get(`${uri}`)
  }

  post(uri: String, payload: Object){
    return this.http.post(`${uri}`, payload)
  }

  patch(uri: String, payload: Object){
    return this.http.patch(`${uri}`, payload)
  }

  delete(uri: String){
    return this.http.delete(`${uri}`)
  }
}
