import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

  vdata:SafeResourceUrl | undefined;


  constructor(public sanitizer:DomSanitizer) {}


  ngOnInit(): void {
    this.vdata = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:5000/visualization');
  }
}
