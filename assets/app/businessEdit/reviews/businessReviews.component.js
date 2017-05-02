var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AppService } from '../../app.service';
import 'rxjs/add/operator/map';
var BusinessReviewsComponent = (function () {
    function BusinessReviewsComponent(businessService, router, http, appService) {
        this.businessService = businessService;
        this.router = router;
        this.http = http;
        this.appService = appService;
        this.count = 15;
    }
    BusinessReviewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (data) {
            if (data.success && data.business) {
                _this.businessId = data.business._id;
                _this.businessService.getAverageRating(_this.businessId).subscribe(function (data) {
                    _this.averageRating = data.data;
                    _this.averageString = data.data.toFixed(1);
                }, function (err) {
                    switch (err.status) {
                        case 404:
                            _this.router.navigateByUrl('/404-error');
                            break;
                        case 401:
                            _this.router.navigateByUrl('/notAuthorized-error');
                            break;
                        default:
                            _this.router.navigateByUrl('/500-error');
                            break;
                    }
                });
                _this.businessService.getReviews(_this.businessId).subscribe(function (data) {
                    _this.reviews = data.data;
                    _this.count = _this.reviews.length;
                }, function (err) {
                    switch (err.status) {
                        case 404:
                            _this.router.navigateByUrl('/404-error');
                            break;
                        case 401:
                            _this.router.navigateByUrl('/notAuthorized-error');
                            break;
                        default:
                            _this.router.navigateByUrl('/500-error');
                            break;
                    }
                });
            }
        });
    };
    return BusinessReviewsComponent;
}());
BusinessReviewsComponent = __decorate([
    Component({
        selector: 'app-businessEdit-reviews',
        templateUrl: './businessReviews.component.html'
    }),
    __metadata("design:paramtypes", [BusinessService,
        Router,
        Http,
        AppService])
], BusinessReviewsComponent);
export { BusinessReviewsComponent };
