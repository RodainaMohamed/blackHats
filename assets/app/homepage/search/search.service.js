var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Business } from '../business.model';
var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
        this.path = "http://localhost:8080/api/";
        this.businesses = [];
    }
    SearchService.prototype.getBusinesses = function (search) {
        var _this = this;
        return this.http.get(this.path + 'search?' + search)
            .map(function (response) {
            var businesses = response.json().data;
            var transformedBusiness = [];
            for (var _i = 0, businesses_1 = businesses; _i < businesses_1.length; _i++) {
                var business = businesses_1[_i];
                transformedBusiness.push(new Business(business._id, business.name, business.logo, business.reviews, business.email, business.phoneNumbers, business.workingDays, business.workingHours, business.location, business.tags, business.category, business.description, business.interactivity, business.totalRatings, business.photos, business.paymentRequired, business.deposit, business.averageRating.toFixed(1)));
            }
            _this.businesses = transformedBusiness;
            return transformedBusiness;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    return SearchService;
}());
SearchService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], SearchService);
export { SearchService };
