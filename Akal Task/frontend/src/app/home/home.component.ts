import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['Full_Name', 'email', 'mobile', 'edit', 'delete'];
  dataSource: any

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  data = []
  count = 0;
  getData() {
    this.signupService.getData(this.obj).subscribe((res) => {
      this.data = res.data;

      if (this.count == 0) {
        this.pageLength = res.count
        this.count++
      }
      // this.dataSource = new MatTableDataSource(this.data)
      // this.dataSource.paginator = this.paginator;
    })
  }

  obj = {
    pageSize: '3',
    pageIndex: '0'
  }
  pageLength: any;
  pageEvent(data) {
    this.obj['pageSize'] = data.pageSize;
    this.obj['pageIndex'] = data.pageIndex;
    this.getData()
  }

  singleData: any
  openForm(data: any) {
    this.singleData = data
    this.updateForm.patchValue(data)
  }

  updateForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required)
  })

  Update() {
    if (this.updateForm.valid) {
      this.signupService.updateUser(this.updateForm.value, this.singleData._id).subscribe((res) => {
        if (res.error == false) {
          this.closeModal.nativeElement.click()
          this.getData()
          Swal.fire('success', "Updated", 'success')
        }
      })
    }
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.signupService.deleteUser(id).subscribe((res) => {
          if (res.error == false) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getData();
          }
        }, (err) => {
          Swal.fire('error', 'Something Went Wrong!', 'error')
        })
      }
    })
  }

}
