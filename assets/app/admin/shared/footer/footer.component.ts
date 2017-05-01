import { AfterContentInit, Component } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.component.html'
})


export class FooterComponent implements AfterContentInit {
  ngAfterContentInit() {
    $.noConflict();
    $.getScript('/admin/js/custom.min.js');
  }
};
