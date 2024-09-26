import { AlertSoccerComponent } from '../alert-soccer/alert-soccer.component';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertSoccerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  popOverInfo: any = {};
  showPopOver = signal(null);
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

  constructor() {
    effect(() => {
      this.updatePopOver();
    });
  }
  ngOnInit(): void {
    this.popOverInfo = {
      text: 'sdfsdfds',
      type: '',
      show: false
    };
  }

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
        this.popOverInfo.show = true;
        if (error.status === 401) {
          this.loginService.isLoggedIn.set(true);
          this.loginService.isLoggedIn.set(false);
        }
      },
      complete: () => {
      }
    })
  }

  updatePopOver() {
      if (this.loginService.isLoggedIn()) {
        this.popOverInfo = {
          text: 'Loggin successfully',
          type: 'success',
          show: true && this.loginForm.touched
        };
      } else {
        this.popOverInfo = {
          text: 'User unauthorized',
          type: 'error',
          show: true && this.loginForm.touched
        };
      }
      if (this.loginForm.touched) {
        setTimeout(() => {
          this.popOverInfo.show = false;
          this.loginForm.reset();
        }, 2000);
      }
  }
}
