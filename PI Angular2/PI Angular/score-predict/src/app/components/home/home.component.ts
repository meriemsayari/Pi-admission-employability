import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


   predictionForm = new FormGroup({
    id_concours: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ]),
    moy_bac_et: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(20)
    ])
  });

  constructor(private router: Router) {}

  get idConcours() {
    return this.predictionForm.get('id_concours')!;
  }

  get moyBacEt() {
    return this.predictionForm.get('moy_bac_et')!;
  }

  onSubmit() {
    if (this.predictionForm.valid) {
      const formData = this.predictionForm.value;
      // Navigate to predict component with query params
      this.router.navigate(['/result'], {
        queryParams: {
          id_concours: formData.id_concours,
          moy_bac_et: formData.moy_bac_et
        }
      });
    }
  }
}
