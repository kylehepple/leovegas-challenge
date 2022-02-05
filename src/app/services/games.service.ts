import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {

    return this.http.get('https://www.mocky.io/v2/5da99f9f31000036004e0a4e');

  }

}
