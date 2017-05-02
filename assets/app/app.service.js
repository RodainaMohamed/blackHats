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
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.isLoggedin = false;
        this.apiPath = "http://localhost:8080/api/";
    }
    // to do from the database
    AppService.prototype.login = function () {
        //should add here the linking to backend function
        this.isLoggedin = true;
        return this.isLoggedin;
    };
    AppService.prototype.logout = function () {
        //should add here the linking to backend function
        this.isLoggedin = false;
        return this.isLoggedin;
    };
    AppService.prototype.status = function () {
        return this.isLoggedin;
    };
    AppService.prototype.getCurrentUser = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/currentUser', { headers: headers }).map(function (res) { return res.json(); });
    };
    AppService.prototype.charge = function (token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            stripeToken: token
        };
        return this.http.post(this.apiPath + "charge", body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return AppService;
}());
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AppService);
export { AppService };
