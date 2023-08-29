import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '..//..//auth-module/auth/auth.service';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/models/response.model';
import { IUser } from 'src/app/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usernameTouched = false;
  passwordTouched = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userData: this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
    });
  }

  onLogin(): void {
    this.usernameTouched = true;
    this.passwordTouched = true;

    const usernameControl = this.loginForm.get('userData.username');
    const passwordControl = this.loginForm.get('userData.password');

    if (this.loginForm.valid) {
      const userData: IUser = {
        username: usernameControl?.value,
        password: passwordControl?.value
      };

      this.authService.onLogin(userData).subscribe(
        response => {
          this.handleLoginResponse(response);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  handleLoginResponse(response: IResponse): void {
    const token = response.token;
    if (token) {
      this.resetLoginFormAndNavigate();
    } else {
      this.loginForm.reset();
    }
  }

  resetLoginFormAndNavigate(): void {
    this.loginForm.reset();
    this.router.navigate(['/products']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
