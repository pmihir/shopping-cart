import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    emailId: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  })

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    let loginData = {
      email: this.loginForm.value.emailId,
      password: this.loginForm.value.password
    }
    this.commonService.login(loginData).subscribe((res) => {
      console.log(res)
      if (res.success == true) {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("userId", res.user);
        this.router.navigate(['/products']);
      }
    },
      (err) => {
        console.log(err);
      })
  }

}
