import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loginform = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required)
  })

  login() {
    if (this.loginform.valid) {
      this.loginService.login(this.loginform.value).subscribe((res) => {
        console.log(res)
        if (res.error==false && res.token) {
          localStorage.setItem('fhjsadhgvsd132vbjf@njnfe', res.token)
          this.router.navigate(['/home'])
        }else if(res.error==true){
          Swal.fire('info', 'Invalid Email id or Password', 'info')
        }
      },(err)=>{
        Swal.fire('error','Something Went Wrong!', 'error')
      })
    }
  }
}
