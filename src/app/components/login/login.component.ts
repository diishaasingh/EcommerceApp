import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
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
          console.log(response)
          this.handleLoginResponse(response);
        },
        error =>{
          this.displayLoginError('Invalid login credentials','Dismiss')
        }
      );
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

  displayLoginError(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center', 
    });
  }
  
}
