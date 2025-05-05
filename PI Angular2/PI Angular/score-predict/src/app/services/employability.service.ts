import { Injectable } from '@angular/core';
import { EmployabilityData } from '../models/employability.model';

@Injectable({
  providedIn: 'root'
})
export class EmployabilityService {



  predictEmployability(formData: EmployabilityData): any {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
