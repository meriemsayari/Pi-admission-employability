import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

      vdata:SafeResourceUrl | undefined;

      constructor(public sanitizer:DomSanitizer) {}


      ngOnInit(): void {
        this.vdata = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:5000/history');
      }

}
