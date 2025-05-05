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
   
    ReactiveFormsModule, // Ensure ReactiveFormsModule is imported
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
    private fb: FormBuilder, // Use FormBuilder for easier form creation
   
    private router: Router,
    private authService: AuthService // Inject your AuthService here
  ) {
    // Initialize the form with controls
    this.loginForm = this.fb.group({
      email: ['', Validators.required], // Add validation if needed
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      let userDTO : UserDTO = {
        email: email,
        password: password,
      };
      console.log('Logging in with:', email, password);
      this.router.navigate(['/home']);
      // this.authService.loginUser(userDTO).subscribe(
      //   (response) => {
      //     console.log('Login response:', response);
      //     if (response && response.token) {
      //       this.authService.setToken(response.token); // Store the token
      //       this.authService.storeCurrentUser(); // Store the current user
      //       this.router.navigate(['/home']); // Redirect to home page after successful login
      //     } else {
      //       this.displayErrorLogin = true; // Show error message if login fails
      //     }
      //   },
      //   (error) => {
      //     console.error('Login error:', error);
      //     this.displayErrorLogin = true; // Show error message if login fails
      //   }
      // );

    } else {
      this.displayErrorLogin = true;
    }
  }
}