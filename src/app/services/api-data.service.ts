import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  constructor(private http: HttpClient) {}

  url: string =
    'https://raw.githubusercontent.com/DariaRska/flights-data/main/flightsData.json';

  getApiData() {
    return this.http.get(this.url);
  }
}
