import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../business.service';
import {Router} from '@angular/router';
import { Http, Headers } from '@angular/http';
import {RatingModule} from "ngx-rating";
import 'rxjs/add/operator/map';


@Component({
    selector: 'app-businessEdit-reviews',
    templateUrl: './businessReviews.component.html'
})
export class BusinessReviewsComponent implements OnInit {
    count: Number = 15;
    reviews: [Object];
    businessId: String = "58e8fbfdf376d034c5cdbc09";
    averageString: String;
    averageRating: Number;

    constructor(
        private businessService: BusinessService,
        private router: Router,
        private http: Http) { }

    ngOnInit() {
        this.businessService.getAverageRating(this.businessId).subscribe(
            (data) => {
                this.averageRating = data.data;
                this.averageString = data.data.toFixed(1);
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

        this.businessService.getReviews(this.businessId).subscribe(
            (data) => {
                this.reviews = data.data;
                this.count = this.reviews.length;
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
}
