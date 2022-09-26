import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Student} from "../model/studen";
import {Classes} from "../model/classes";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  idUpdate!: any;
  url!: any
  idUpdateClass:any;
  id: any;
  students: Student[] = []
  studentForm!: FormGroup;
  formUpdateStudent!: FormGroup;
  listClass?: Classes[];
  formDetail!: FormGroup;
  constructor(private studentService: StudentService,
              private formGroup: FormBuilder) { }

  ngOnInit(): void {
    this.displayClasses();
    this.displayStudent();

    this.studentForm = this.formGroup.group({
      id: [''],
      name: [''],
      age: [''],
      rooms: [''],
    })
    this.formDetail = this.formGroup.group({
      id: [''],
      name: [''],
      age: [''],
      rooms: [''],
    })
    this.formUpdateStudent = this.formGroup.group({
      id: [''],
      name: [''],
      age: [''],
      rooms: [''],
    });
  }

  displayStudent() {
    this.studentService.findAll().subscribe(value => {
      this.students = value
      console.log(value)

    })
  }
  displayClasses(){
    this.studentService.findClasses().subscribe(value => {
      this.listClass = value
      console.log(this.listClass)
    })
  }

  findClassById(){
    let id;
    id = this.studentForm.get('rooms')?.value
    console.log(id)
    return id;
  }
  findClassByIdUpdate(){
    let idU;
    // @ts-ignore
    idU = document.getElementById(`select`).value
    this.idUpdateClass=idU
    return idU;
  }
  createStudent() {
    let student = {
      id: this.studentForm.value.id,
      name: this.studentForm.value.name,
      age: this.studentForm.value.age,
      classes:{
        id: this.studentForm.value.rooms
      },
    }
    this.studentService.createStudent(student).subscribe(value => {
      // document.getElementById("reset")!.click()
      // this.displayStudent()
      console.log(value)
      this.ngOnInit()
    })
  }
  deleteStudentById(id?: number){
    this.studentService.deleteStudentById(id).subscribe(() => {
      alert("sắc sét")
      // this.displayStudent()
    })
  }
  getStudent(id?: number) {
    return this.studentService.findStudentById(id).subscribe(data => {
      this.idUpdate = id;
      console.log(data)
      this.formUpdateStudent = new FormGroup({
        name: new FormControl(data.name),
        age: new FormControl(data.age),
        rooms: new FormControl(data.classes?.name)
      });
    });
  }

  updateS() {
    let student = {
      id: this.idUpdate,
      name: this.formUpdateStudent.value.name,
      age: this.formUpdateStudent.value.age,
      classes:{
        id: this.idUpdateClass
      }
    }
    console.log(student)
    this.studentService.UpdateStudentById(student).subscribe(value => {
      document.getElementById("resetU")!.click()
      // this.displayStudent()
      console.log(value)
    })
  }
}
