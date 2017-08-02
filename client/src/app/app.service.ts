import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { State } from './app.model';

@Injectable()
export class AppService {

  constructor(
    private http: Http
  ) { }

  public getStates(): Observable<State[]> {
    return this.http.get('http://localhost:3000/api/states')
      .map((response: Response) => {
        return <State[]>response.json();
      });
  }

  public postState(state: State): Observable<Response> {
    return this.http.post('http://localhost:3000/api/states', state);
  }

  public deleteState(state: State): Observable<Response> {
    return this.http.delete(`http://localhost:3000/api/states/${state._id}`);
  }
}
