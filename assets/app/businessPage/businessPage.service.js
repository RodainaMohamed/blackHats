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
var BusinessPageService = (function () {
    function BusinessPageService(http) {
        this.http = http;
    }
    BusinessPageService.prototype.getBusinessInfo = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/business/' + businessId + '/getInfo', { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.getReviews = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.getActivities = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/activity/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.getAverageRating = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/averageRating/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.updateInteractivity = function (businessId) {
        return this.http.put('http://localhost:8080/api/business/' + businessId + '/interact', null, null).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.addFavorite = function (businessId) {
        return this.http.put('http://localhost:8080/api/user/addFavorite/' + businessId, null, null).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.deleteFavorite = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/user/deleteFavorite/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.getAvailableSlots = function (activityId, date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "date": date,
            "activityID": activityId
        };
        return this.http.post('http://localhost:8080/api/activity/freeSlots', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessPageService.prototype.bookActivity = function (slot, activityId, date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "date": date,
            "activity": activityId,
            "slot": slot
        };
        return this.http.post('http://localhost:8080/api/activity/book', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return BusinessPageService;
}());
BusinessPageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], BusinessPageService);
export { BusinessPageService };
