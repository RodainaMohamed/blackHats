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
var VerifyService = (function () {
    function VerifyService(http) {
        this.http = http;
    }
    VerifyService.prototype.verifyToken = function (token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/user/verifyAccount/' + token, { headers: headers }).map(function (res) { return res.json(); });
    };
    VerifyService.prototype.confirmId = function (userId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/user/verifyAccount/' + userId, { headers: headers }).map(function (res) { return res.json().data; });
    };
    return VerifyService;
}());
VerifyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], VerifyService);
export { VerifyService };
