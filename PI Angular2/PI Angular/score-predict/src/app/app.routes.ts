import { Routes } from '@angular/router';

// Composants Admission
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { copyComponent } from './components/copy/copy.component';

// Composants Employability
import { empComponent } from './components/emp/emp.component';
import { EmployabilityResultComponent } from './components/employability-result/employability-result.component';
import { EmployabilityComponent } from './components/employability/employability.component';

// Composants communs
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HistoryComponent } from './components/history/history.component';
import { ResultComponent } from './components/result/result.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';

// Guard
import { RoleGuard } from './role.guard';
import { employeesComponent } from './components/employees/employees.component';
import { companyComponent } from './components/company/company.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  // Routes accessibles uniquement pour le rôle "admission"
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['admission'] } },
  { path: 'visualization', component: VisualizationComponent, canActivate: [RoleGuard], data: { roles: ['admission'] } },
  { path: 'copy', component: copyComponent, canActivate: [RoleGuard], data: { roles: ['admission'] } },

  // Routes spécifiques à "employability"
  { path: 'employability', component: EmployabilityComponent, canActivate: [RoleGuard], data: { roles: ['employability'] } },
  { path: 'employability-result', component: EmployabilityResultComponent, canActivate: [RoleGuard], data: { roles: ['employability'] } },
  { path: 'emp', component: empComponent, canActivate: [RoleGuard], data: { roles: ['employability'] } },
   { path: 'employees', component: employeesComponent, canActivate: [RoleGuard], data: { roles: ['employability'] } },
   {path: 'company', component:companyComponent, canActivate: [RoleGuard], data: { roles: ['employability'] } },

  // Routes accessibles aux deux rôles (pas protégées ou avec vérification dans le composant si nécessaire)
  { path: 'error', component: ErrorComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'result', component: ResultComponent },
  { path: 'sidebar', component: SidebarComponent },
  {path:'about', component: AboutComponent},
  
  // Page d'erreur par défaut
  { path: '**', redirectTo: 'error' },
];
