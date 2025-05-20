import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importer RouterModule

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterModule], // Ajouter RouterModule dans les imports
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class companyComponent {}
