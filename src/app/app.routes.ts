import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { UploadComponent } from './components/upload/upload.component';
import { ContentDetailsComponent } from './components/content-details/content-details.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginGuard } from './services/login-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'content/:id', component: ContentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'challenge', component: ChallengeComponent, canActivate: [AuthGuard] },
];
