import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { MainSoccerComponent } from './components/main-soccer/main-soccer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guards/login-guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: MainSoccerComponent
    },
    { 
        path: 'admin',
        canActivate: [ AuthGuard ],
        component: UserComponent 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { 
        path: '**', 
        component: PageNotFoundComponent
    } 
];
