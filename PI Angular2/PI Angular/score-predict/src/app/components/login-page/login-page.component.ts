import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginComponent {
  
  loginForm: FormGroup;
  accountCreated: boolean = false;
  displayErrorLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

login() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    let userDTO: UserDTO = {
      email: email,
      password: password,
    };

    if (email.includes('@admission.tn')) {
      localStorage.setItem('role', 'admission');
      this.router.navigate(['/dashboard']);
    } else if (email.includes('@employability')) {
      localStorage.setItem('role', 'employability');
      this.router.navigate(['/emp']);
    } else {
      this.displayErrorLogin = true;
    }
  } else {
    this.displayErrorLogin = true;
  }
}

}
