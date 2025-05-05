import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private predictions: any[] = [];

  private apiUrl = 'http://localhost:5000'; // Update with your Flask API URL

  constructor(private http: HttpClient) {}

  predict(idConcours: string, moyBacEt: string, result: string): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(`${this.apiUrl}/predict`, {
      id_concours: idConcours,
      moy_bac_et: moyBacEt,
      resultat: result
    });
  }

  visualization(){
     return this.http.get(`${this.apiUrl}/visualization`);
  }

}

export interface PredictionResponse {
  prediction: number;
  data: {
    id_concours: number;
    moy_bac_et: number;
    resultat: string;
  };
}
