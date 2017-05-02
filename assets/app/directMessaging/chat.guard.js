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
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Http, Headers } from '@angular/http';
var ChatGuard = (function () {
    function ChatGuard(appService, router, http) {
        this.appService = appService;
        this.router = router;
        this.http = http;
    }
    ChatGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/currentUser', { headers: headers }).map(function (response) {
            var res = response.json();
            if (res.success) {
                return true;
            }
            _this.router.navigate(["/homepage"]);
            return false;
        }).first();
    };
    return ChatGuard;
}());
ChatGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppService,
        Router,
        Http])
], ChatGuard);
export { ChatGuard };
