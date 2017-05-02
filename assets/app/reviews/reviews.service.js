var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
var ReviewsService = (function () {
    function ReviewsService(http) {
        this.http = http;
    }
    ReviewsService.prototype.getBusinessInfo = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/business/' + businessId + '/getInfo', { headers: headers }).map(function (res) { return res.json(); });
    };
    ReviewsService.prototype.getReviews = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    ReviewsService.prototype.getAverageRating = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/averageRating/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    ReviewsService.prototype.addFavorite = function (businessId) {
        return this.http.put('http://localhost:8080/api/user/addFavorite/' + businessId, null, null).map(function (res) { return res.json(); });
    };
    ReviewsService.prototype.addReview = function (review) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(review);
        var businessId = review.business;
        return this.http.post('http://localhost:8080/api/review/' + businessId + '/add', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return ReviewsService;
}());
ReviewsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ReviewsService);
export { ReviewsService };
