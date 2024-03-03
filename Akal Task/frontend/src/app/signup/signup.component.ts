import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signupService: SignupService,public router : Router) { }

  ngOnInit(): void {
  }

  signupform = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required),
    contactNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  })

  create() {
    if (this.signupform.valid) {
      console.log(this.signupform.value)
      this.signupService.create(this.signupform.value).subscribe((res) => {
        console.log(res)
        if (res.error) {
          Swal.fire('info', 'This User is already Exist', 'info')
        } else {
          this.signupform.reset();
          this.router.navigate(['/home'])
          Swal.fire('success', "Added", 'success')
        }
      }, (err) => {
        Swal.fire('error', 'Something Went Wrong!', 'error')
      })
    }
  }
}
