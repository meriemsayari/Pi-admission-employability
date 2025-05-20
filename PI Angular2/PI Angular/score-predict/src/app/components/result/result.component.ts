import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  prediction: number | null = null;
  idConcours: number | null = null;
  moyBacEt: number | null = null;
  result: string | null = "REFUSE(E)";

  constructor(private route: ActivatedRoute, private predictionService: PredictionService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idConcours = params['id_concours'] ? +params['id_concours'] : null;
      this.moyBacEt = params['moy_bac_et'] ? +params['moy_bac_et'] : null;
    });


    if(this.moyBacEt! >= 10 && this.moyBacEt! < 12){
      this.result = "LISTE ATTENTE";
    }else if(this.moyBacEt! >= 12){
      this.result = "ADMIS(E)";
    }
     this.predictionService.predict(this.idConcours?.toString()!, this.moyBacEt?.toString()!,this.result!) .subscribe(response => {
        if (response) {
          this.prediction = response.prediction;
        }
      });;

    //this.result = this.predictionService.getPredictions(this.idConcours,this.moyBacEt,this.result);

  }



}
