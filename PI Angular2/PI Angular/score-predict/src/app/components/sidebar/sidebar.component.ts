import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  role: string | null = null;

  links: { label: string, path: string, icon: string }[] = [];

  ngOnInit(): void {
    this.role = localStorage.getItem('role');

    if (this.role === 'admission') {
      this.links = [
        { label: 'Accueil', path: '/home', icon: 'fas fa-home' },
        { label: 'Candidats', path: '/dashboard', icon: 'fas fa-users' },
        { label: 'Admission', path: '/copy', icon: 'fas fa-user-plus' },
        { label: 'Visualisation', path: '/visualization', icon: 'fas fa-chart-bar' },
        { label: 'Historique', path: '/history', icon: 'fas fa-history' },
        { label: 'À propos', path: '/about', icon: 'fas fa-info-circle' },
      ];
    } else if (this.role === 'employability') {
      this.links = [
        { label: 'EMP', path: '/emp', icon: 'fas fa-user-tie' },
        { label: 'Employabilité', path: '/employability', icon: 'fas fa-briefcase' },
        { label: 'Résultats', path: '/employability-result', icon: 'fas fa-poll' },
        { label: 'Company', path: '/company', icon: 'fas fa-building' },
        { label: 'Historique', path: '/history', icon: 'fas fa-history' },
        { label: 'À propos', path: '/about', icon: 'fas fa-info-circle' },
         { label: 'employees', path: '/employees', icon: 'fas fa-info-circle' },
      ];
    }
  }
}
