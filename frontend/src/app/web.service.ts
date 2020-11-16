import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly ROOT_URL: String
  constructor(private http: HttpClient) {
      this.ROOT_URL = "http://localhost:3000"
   }

   get(uri: String){
     return this.http.get(`${this.ROOT_URL}/${uri}`)
   }

  post(uri: String, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

  patch(uri: String, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload)
  }

  delete(uri: String){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }
}
