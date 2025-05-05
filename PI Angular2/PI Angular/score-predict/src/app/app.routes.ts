import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { EmployabilityResultComponent } from './components/employability-result/employability-result.component';
import { EmployabilityComponent } from './components/employability/employability.component';
import { ErrorComponent } from './components/error/error.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { LoginComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { copyComponent } from './components/copy/copy.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employability', component: EmployabilityComponent },
  { path: 'employability-result', component: EmployabilityResultComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'result', component: ResultComponent },
  { path: 'visualization', component: VisualizationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'error', component: ErrorComponent },
  
  //{ path: '**', redirectTo: '/error' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'copy',component:copyComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' }
];
