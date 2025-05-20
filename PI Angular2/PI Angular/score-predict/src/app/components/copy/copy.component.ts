import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importer RouterModule

@Component({
  selector: 'app-copy',
  standalone: true,
  imports: [RouterModule], // Ajouter RouterModule dans les imports
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})
export class copyComponent {}
