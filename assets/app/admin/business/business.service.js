var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Business } from './business.model';
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
var BusinessService = (function () {
    function BusinessService(http) {
        this.http = http;
        this.apiPath = "http://localhost:8080/api/";
    }
    BusinessService.prototype.getBusinesses = function () {
        return this.http.get(this.apiPath + 'admin/business/getAll')
            .map(function (response) {
            var businesses = response.json().data;
            var transformedBusinesses = [];
            for (var _i = 0, businesses_1 = businesses; _i < businesses_1.length; _i++) {
                var business = businesses_1[_i];
                if (!business.location)
                    business.location = { city: "None" };
                else if (!business.location.city)
                    business.location.city = "None";
                transformedBusinesses.push(new Business(business._id, business.name, business.email, business.location, business.averageRating, business.createdAt));
            }
            return transformedBusinesses;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    BusinessService.prototype.getUnverifiedBusinesses = function () {
        return this.http.get(this.apiPath + 'admin/business/unVerifiedBusinesses')
            .map(function (response) {
            var businesses = response.json().data;
            var transformedBusinesses = [];
            for (var _i = 0, businesses_2 = businesses; _i < businesses_2.length; _i++) {
                var business = businesses_2[_i];
                transformedBusinesses.push(new Business(business._id, business.name, business.email, business.location, business.averageRating, business.createdAt));
            }
            return transformedBusinesses;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    BusinessService.prototype.deleteBusiness = function (businessId) {
        var _this = this;
        return this.http.delete(this.apiPath + 'admin/business/delete/' + businessId)
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    BusinessService.prototype.verifyBusiness = function (businessId) {
        var _this = this;
        return this.http.put(this.apiPath + 'admin/business/verify/' + businessId, { verified: true })
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    return BusinessService;
}());
BusinessService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], BusinessService);
export { BusinessService };
