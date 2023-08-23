import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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

      this.authService.getUsers().pipe(
        tap(users => {
          const matchedUser = users.find(
            user =>
              user.username === enteredUsername &&
              user.password === enteredPassword
          );

          if (matchedUser) {
            // Generate token and set it in AuthService
            this.authService.login(matchedUser);

            alert('Login successful');
            this.loginForm.reset();
            this.router.navigate(['/products']);
          } else {
            alert('Invalid login credentials');
            this.loginForm.reset();
          }
        })
      ).subscribe();
    }
  }
}
