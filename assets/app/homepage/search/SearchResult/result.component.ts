import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../search.service';
import { Business } from '../../business.model';


@Component({
    selector: 'homepage-search-result',
    templateUrl: './result.component.html'
})
export class SearchResultComponent implements OnInit {
    private businesses: Business[] = [];
    private temp: Observable<Business[]>;
    private sliced: Business[] = [];
    private pagingIndex: number[] = [];
    private pageNumber: number;
    private searchQuery: string;
    private sort: string;

    constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.getQueryParams();
        this.search();
    }


    search() {
        this.searchService.getBusinesses(this.searchQuery).subscribe(
          (businesses) => {
            this.businesses = businesses;
            this.sliced = this.businesses.slice(this.pageNumber - 1, this.pageNumber * 16 + 15);
            this.pagingIndex = new Array(Math.ceil(this.businesses.length / 16));
        }, (err) => {
          switch (err.status) {
              case 404:
                  this.router.navigateByUrl('/404-error');
                  break;
              case 401:
                  this.router.navigateByUrl('/notAuthorized-error');
                  break;
              default:
                  this.router.navigateByUrl('/500-error');
                  break;
          }
        });
    }

    getQueryParams() {
        this.route
            .queryParams
            .subscribe(params => {
                this.pageNumber = +params['page'];
                this.searchQuery = params['result'];

                if (!this.searchQuery) {
                    this.searchQuery = "location=" + params['location'] + "&&category=" + params['category'];
                }
                else
                    this.searchQuery = "result=" + this.searchQuery;
                this.searchQuery = this.searchQuery + "&&sort=" + this.sort;
                console.log(this.searchQuery);
            })
    }

    updateSortQuery(sortValue: string) {
        this.sort = sortValue;
        this.getQueryParams();
        this.search();
    }

    nextPage() {
        this.router.navigate(['search'], { queryParams: { result: this.searchQuery, page: this.pageNumber + 1 || 1 } });
    }

    previousPage() {
        this.router.navigate(['search'], { queryParams: { result: this.searchQuery, page: this.pageNumber - 1 || 1 } });
    }
}
