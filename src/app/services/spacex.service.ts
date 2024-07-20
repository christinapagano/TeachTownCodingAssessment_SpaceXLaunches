import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {

  private apiUrl = 'https://api.spacexdata.com/v4';

  constructor() { }

  getLaunches(sortField: string = 'launch_date_utc', sortOrder: string = 'asc'): Observable<any[]> {
    const sortParam = `${sortField}:${sortOrder}`;
    return new Observable<any[]>(observer => {
      axios.get(`${this.apiUrl}/launches`, {
        // Fetch launch data in order of launch date
        params: {
          sort: sortParam
        }
      })
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
