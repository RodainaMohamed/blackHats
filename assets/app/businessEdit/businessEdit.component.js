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
import { BusinessService } from './business.service';
var BusinessEditComponent = (function () {
    function BusinessEditComponent(businessService) {
        this.businessService = businessService;
        this.showActivities = true;
        this.showPhotos = false;
        this.showReviews = false;
        this.showBookings = false;
        this.showEdit = false;
        this.showAds = false;
    }
    BusinessEditComponent.prototype.onActivitiesClick = function () {
        this.showActivities = true;
        this.showPhotos = false;
        this.showReviews = false;
        this.showBookings = false;
        this.showEdit = false;
        this.showAds = false;
    };
    BusinessEditComponent.prototype.onPhotosClick = function () {
        this.showActivities = false;
        this.showPhotos = true;
        this.showReviews = false;
        this.showBookings = false;
        this.showEdit = false;
        this.showAds = false;
    };
    BusinessEditComponent.prototype.onReviewsClick = function () {
        this.showActivities = false;
        this.showPhotos = false;
        this.showReviews = true;
        this.showBookings = false;
        this.showEdit = false;
        this.showAds = false;
    };
    BusinessEditComponent.prototype.onBookingsClick = function () {
        this.showActivities = false;
        this.showPhotos = false;
        this.showReviews = false;
        this.showBookings = true;
        this.showEdit = false;
        this.showAds = false;
    };
    BusinessEditComponent.prototype.onEditClick = function () {
        this.showActivities = false;
        this.showPhotos = false;
        this.showReviews = false;
        this.showBookings = false;
        this.showEdit = true;
        this.showAds = false;
    };
    BusinessEditComponent.prototype.onAdsClick = function () {
        this.showActivities = false;
        this.showPhotos = false;
        this.showReviews = false;
        this.showBookings = false;
        this.showEdit = false;
        this.showAds = true;
    };
    return BusinessEditComponent;
}());
BusinessEditComponent = __decorate([
    Component({
        selector: 'app-business',
        templateUrl: './businessEdit.component.html'
    }),
    __metadata("design:paramtypes", [BusinessService])
], BusinessEditComponent);
export { BusinessEditComponent };
