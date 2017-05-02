var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.reviews = [];
        this.loggedin = true;
    }
    UserService.prototype.getAverageRating = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/averageRating/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.getReviews = function (userId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/user/' + userId, { headers: headers }).map(function (res) { return res.json(); });
    };
    //get the user's info:
    UserService.prototype.getOneUser = function (userId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/user/profile/' + userId, { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.getCurrentInfo = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/business/' + businessId + '/getInfo', { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.getBookingHistory = function (userId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/booking/history/' + userId, { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.deleteFavorite = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/user/deleteFavorite/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.deleteReview = function (reviewId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/review/' + reviewId + '/delete', { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.editReview = function (reviewId, comment, rating) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "comment": comment,
            "rating": rating
        };
        return this.http.put('http://localhost:8080/api/review/' + reviewId + '/edit', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserService);
export { UserService };
