import { Component, AfterViewChecked } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements AfterViewChecked {
  ngAfterViewChecked() {
    $(".selectpicker").selectpicker();
  }
}
