import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importer RouterModule

@Component({
  selector: 'app-emp',
  standalone: true,
  imports: [RouterModule], // Ajouter RouterModule dans les imports
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class empComponent {}
