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
import { SupportRequest } from './support.model';
var SupportService = (function () {
    function SupportService(http) {
        this.http = http;
        this.apiPath = "http://localhost:8080/api/";
    }
    SupportService.prototype.getRequests = function () {
        return this.http.get(this.apiPath + 'admin/support/getRequests')
            .map(function (response) {
            var requests = response.json().data;
            var transformedRequests = [];
            for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                var request = requests_1[_i];
                transformedRequests.push(new SupportRequest(request._id, request.title, request.contactEmail, request.contactPhoneNumber, request.accountType, request.registeredEmail, request.description, request.createdAt));
            }
            return transformedRequests;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    SupportService.prototype.recoverAccount = function (requestId, accountType) {
        var _this = this;
        if (accountType === "Business") {
            return this.http.put(this.apiPath + 'admin/support/business/recoverAccount/' + requestId, {})
                .map(function (response) {
                _this.alertMsg = response.json().msg;
                return _this.alertMsg;
            })
                .catch(function (error) { return Observable.throw(error.json()); });
        }
        else {
            return this.http.put(this.apiPath + 'admin/support/user/recoverAccount/' + requestId, {})
                .map(function (response) {
                _this.alertMsg = response.json().msg;
                return _this.alertMsg;
            })
                .catch(function (error) { return Observable.throw(error.json()); });
        }
    };
    SupportService.prototype.rejectRequest = function (requestId) {
        var _this = this;
        return this.http.delete(this.apiPath + 'admin/support/deleteRequest/' + requestId)
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    return SupportService;
}());
SupportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], SupportService);
export { SupportService };
