import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'homepage-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  constructor(private router: Router) { }

  searchClicked(result: string) {
    this.router.navigate(['search'], { queryParams: { result: result } });
  }

  exploreClicked(location: string, category: string) {
    this.router.navigate(['search'], { queryParams: { location: location, category: category } });
  }

  ngAfterViewInit() {
    $(".selectpicker").selectpicker();
  }
}
