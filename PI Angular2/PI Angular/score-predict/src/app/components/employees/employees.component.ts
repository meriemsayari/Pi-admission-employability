import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importer RouterModule

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterModule], // Ajouter RouterModule dans les imports
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class employeesComponent {}
