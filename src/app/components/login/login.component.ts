import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Constant } from '../../../constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      setTimeout(() => {
        this.showPassword = false;
      }, 2000);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.alertService.showAlert({
          text: response?.message,
          color: Constant.ALERT_COLORS.SUCCESS,
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.alertService.showAlert({
          text: error?.error?.message,
          color: Constant.ALERT_COLORS.ERROR,
        });
      },
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
