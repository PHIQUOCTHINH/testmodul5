import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "./model/studen";
import {Classes} from "./model/classes";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>("http://localhost:8081/api/student")
  }

  createStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>("http://localhost:8081/api/student", student)
  }
  findClasses(): Observable<Classes[]>{
    return  this.httpClient.get<Classes[]>("http://localhost:8081/api/student/classes")
  }
  findClassById(id: any): Observable<Classes>{
    return this.httpClient.get<Classes>("http://localhost:8081/api/students/classes/" + `${id}`)
  }
  findStudentById(id?: number): Observable<Student> {
    return this.httpClient.get<Student>("http://localhost:8081/api/student/" + `${id}`)
  }
  deleteStudentById(id?: number): Observable<Student>{
    return this.httpClient.delete<Student>("http://localhost:8081/api/student/" + `${id}`)
  }

  UpdateStudentById(student?: Student): Observable<Student>{
    return this.httpClient.put<Student>("http://localhost:8081/api/student/" ,student)
  }
}
