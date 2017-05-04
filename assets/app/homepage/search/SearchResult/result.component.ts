import { Observable } from 'rxjs/Rx';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../search.service';
import { Business } from '../../business.model';


@Component({
    selector: 'homepage-search-result',
    templateUrl: './result.component.html'
})
export class SearchResultComponent implements OnInit, AfterViewChecked {
     businesses: Business[] = [];
     temp: Observable<Business[]>;
     sliced: Business[] = [];
     pagingIndex: number[] = [];
     pageNumber: number = 1;
     searchQuery: string;
     sort: string;
     result: string;
     location: string;
     category: string;

    constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        $(".selectpicker").selectpicker();
        this.getQueryParams();
        this.search();
        $("#back-to-top").click();
    }


    search() {
        this.searchService.getBusinesses(this.searchQuery).subscribe(
            (businesses) => {
                this.businesses = businesses;
                this.pagingIndex = new Array(Math.ceil(this.businesses.length / 16));
                this.updatePage(1);
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
            .subscribe((params) => {
                this.result = params['result'];
                this.location = params['location'];
                this.category = params['category'];
                this.searchQuery = "result=" + this.result;
                if (!this.result) {
                    this.searchQuery = "location=" + this.location + "&category=" + this.category;
                }
                this.searchQuery = this.searchQuery + "&sort=" + this.sort;
            },
            (err) => {

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

    previous() {
        if (!(this.pageNumber < 1)) {
            this.updatePage(this.pageNumber - 1);
        }
    }

    next() {
        if (this.pageNumber < this.pagingIndex.length) {
            this.updatePage(this.pageNumber + 1);
        }
    }

    updatePage(page: number) {
        $("#page" + this.pageNumber).removeClass("active");
        this.sliced = this.businesses.slice(page - 1, this.pageNumber * 16 + 15);
        this.pageNumber = page;
        $("#page" + this.pageNumber).addClass("active");
    }

    updateSortQuery(sortValue: string) {
        this.sort = sortValue;
        this.getQueryParams();
        this.search();
    }

    getInteractivity(interactivity) {
        if (interactivity < 50)
            return "Low";
        else if (interactivity < 100)
            return "Average";
        else
            return "High";
    }

    ngAfterViewChecked() {
        $("#page" + this.pageNumber).addClass("active");
        $('input.rating').rating();
    }
}
