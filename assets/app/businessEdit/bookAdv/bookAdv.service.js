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
var BookAdvService = (function () {
    function BookAdvService(http) {
        this.http = http;
    }
    BookAdvService.prototype.getAdvSlots = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/advertisement/getAdvSlots', { headers: headers }).map(function (res) { return res.json(); });
    };
    BookAdvService.prototype.getFreeSlot = function (advId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/advertisement/getFreeSlot/' + advId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BookAdvService.prototype.bookAdvSlot = function (startTime, endTime, advImg, advId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "startTime": startTime.toString(),
            "endTime": endTime.toString(),
            "image": advImg
        };
        return this.http.post('http://localhost:8080/api/advertisement/bookAdvSlot/' + advId, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return BookAdvService;
}());
BookAdvService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], BookAdvService);
export { BookAdvService };
