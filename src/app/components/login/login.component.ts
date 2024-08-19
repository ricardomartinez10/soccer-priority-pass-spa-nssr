import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  loginForm = new FormGroup(
    {
      user: new FormControl(
        '',
        Validators.required
      ),
      password: new FormControl(
        '',
        Validators.required
      )
    }
  );

  onLogginSubmitRequest(event: Event) {
    const user: User = {
      username: this.loginForm.value.user || '',
      password: this.loginForm.value.password || ''
    };

    this.loginService.validateLogIn(user).subscribe({
      next: (event) => {
        switch (event.type) {
          case HttpEventType.Response:
            this.loginService.isLoggedIn.set(true);
            this.router.navigate(['/admin']);
            break;
        }
        
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('User unauthorized');
        }
      }
    })
  }

}
