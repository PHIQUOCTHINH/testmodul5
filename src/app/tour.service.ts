import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "./model/studen";
import {Tour} from "./model/tour";

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Tour[]> {
    return this.httpClient.get<Tour[]>(" http://localhost:3000/tuors")
  }

  createTour(tour: Tour): Observable<Tour> {
    return this.httpClient.post<Student>("http://localhost:3000/tuors", tour)
  }


  findTourById(id?: number): Observable<Tour> {
    return this.httpClient.get<Tour>("http://localhost:3000/tuors/" + `${id}`)
  }
  deleteTourById(id?: number): Observable<Tour>{
    return this.httpClient.delete<Tour>("http://localhost:3000/tuors/" + `${id}`)
  }

  updateTourById(id?: number,tour?: Tour): Observable<Tour>{
    return this.httpClient.put<Tour>("http://localhost:3000/tuors/" + `${id}`,tour)
  }
}
