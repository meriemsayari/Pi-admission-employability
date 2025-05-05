import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-employability',
  templateUrl: './employability.component.html',
  styleUrls: ['./employability.component.scss']
})
export class EmployabilityComponent {

    vdata:SafeResourceUrl | undefined;


    constructor(public sanitizer:DomSanitizer) {}


    ngOnInit(): void {
      this.vdata = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:5000/employability');
    }
  // formData: EmployabilityData = {
  //   sexe: '',
  //   code_nationalite: '',
  //   code_gouv: '',
  //   score_final: 0,
  //   moy_bac_et: 0,
  //   nature_bac: '',
  //   code_cursus: '',
  //   code_diplome: '',
  //   code_spec: ''
  // };

  // constructor(
  //   private employabilityService: EmployabilityService,
  //   private router: Router
  // ) {}

  // onSubmit(): void {
  //   if (this.validateForm()) {
  //     this.employabilityService.predictEmployability(this.formData).subscribe(
  //       (result: any) => {
  //         this.router.navigate(['/employability-result'], { state: { result } });
  //       },
  //       (error: any) => {
  //         this.router.navigate(['/error'], { state: { error: error.message } });
  //       }
  //     );
  //   }
  // }

  // validateForm(): boolean {
  //   // Add validation logic
  //   return true;
  // }
}
