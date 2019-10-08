import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MazeapiService {

  url = 'https://api.tvmaze.com';

  constructor(private http: HttpClient) { }

  getFullSchedule() {
   return this.http.get(`${this.url}/schedule`);
  }

  getShowDetails(id: string) {
    return this.http.get(`${this.url}/shows/${id}`);
  }

  searchShows(q: string) {
    const params = { q };
    return this.http.get(`${this.url}/search/shows`, { params });
  }
}
