import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html'
})
export class TermsComponent implements OnInit {
  ngOnInit() {
    $("#back-to-top").click();
  }
}