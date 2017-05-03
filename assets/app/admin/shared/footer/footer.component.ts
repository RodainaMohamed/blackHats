import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.component.html'
})


export class FooterComponent implements OnInit {
  ngOnInit() {
    $.getScript('/admin/js/custom.min.js');
  }
};
