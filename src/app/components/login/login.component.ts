import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

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
    this.loginForm = this.formBuilder.group({
      userData: this.formBuilder.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
      })
    });
  }


  onLogin(): void {
    this.usernameTouched = true;
    this.passwordTouched = true;

    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.get('userData.username')?.value;
      const enteredPassword = this.loginForm.get('userData.password')?.value;

      this.authService.login({ username: enteredUsername, password: enteredPassword })
  .subscribe(
    response => {
      const token = response.token;
      if (token) {
        this.authService.setAuthToken(token); 
        this.loginForm.reset();
        this.router.navigate(['/products']);
      } else {
        alert('Invalid login credentials');
        this.loginForm.reset();
      }
    }
  );

    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}

