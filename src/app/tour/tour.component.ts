import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {Tour} from "../model/tour";
import {TourService} from "../tour.service";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  idUpdate!: any;
  url!: any
  idUpdateClass:any;
  i = 0;
  id: any;
  tours: Tour[] = []
  tourForm!: FormGroup;
  formUpdateTour!: FormGroup;
  formDetail!: FormGroup;
  constructor(private tourService: TourService,
              private formGroup: FormBuilder) { }

  ngOnInit(): void {
    this.displayTour()
    this.tourForm = this.formGroup.group({
      id: [''],
      title: [''],
      price: [''],
      description: [''],
    })
    this.formDetail = this.formGroup.group({
      id: [''],
      title: [''],
      price: [''],
      description: [''],
    })
    this.formUpdateTour = this.formGroup.group({
      id: [''],
      title: [''],
      price: [''],
      description: [''],
    });
  }
displayTour(){
  this.tourService.findAll().subscribe(value => {
    this.tours = value
    console.log(value)
  })
}
  createTour() {
    let tour = {
      id: this.tourForm.value.id,
      title: this.tourForm.value.title,
      price: this.tourForm.value.price,
      description: this.tourForm.value.description,
    }
    this.tourService.createTour(tour).subscribe(value => {
      console.log(value)
      this.ngOnInit()
    })
  }
  deleteTourId(id?: number){
    if (confirm("Muốn xóa không")){
    this.tourService.deleteTourById(id).subscribe(() => {
      alert("sắc sét")
      this.ngOnInit()
    })
  }
  }
  getTour(id?: number) {
    return this.tourService.findTourById(id).subscribe(data => {
      this.idUpdate = id;
      console.log(data)
      this.formUpdateTour = new FormGroup({
        title: new FormControl(data.title),
        price: new FormControl(data.price),
        description: new FormControl(data.description)
      });
    });
  }
  getTourDetail(id?: number) {
    return this.tourService.findTourById(id).subscribe(data => {
      this.idUpdate = id;
      console.log(data)
      this.formDetail = new FormGroup({
        title: new FormControl(data.title),
        price: new FormControl(data.price),
        description: new FormControl(data.description)
      });
    });
  }
  updateT() {
    let tour = {
      id: this.idUpdate,
      title: this.formUpdateTour.value.title,
      price: this.formUpdateTour.value.price,
      description: this.formUpdateTour.value.description,

    }
    console.log(tour)
    this.tourService.updateTourById(this.idUpdate,tour).subscribe(value => {
      document.getElementById("resetU")!.click()
      console.log(value)
      this.ngOnInit()
    })
  }
}
