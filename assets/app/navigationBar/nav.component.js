var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { LoginService } from '../user/login/login.service';
import { Router } from '@angular/router';
var NavComponent = (function () {
    function NavComponent(appService, loginService, router) {
        this.appService = appService;
        this.loginService = loginService;
        this.router = router;
        this.path = "http://localhost:8080/";
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (data) {
            if (data.success) {
                if (data.user) {
                    _this.user = data.user;
                    _this.isUser = true;
                    if (data.user.admin)
                        _this.isAdmin = true;
                }
                else {
                    _this.business = data.business;
                    _this.isUser = false;
                }
                _this.loggedin = true;
            }
            else {
                _this.loggedin = false;
            }
        });
    };
    NavComponent.prototype.loggedIn = function (args) {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (data) {
            if (data.success) {
                if (data.user) {
                    _this.user = data.user;
                    _this.isUser = true;
                    if (data.user.admin)
                        _this.isAdmin = true;
                }
                else {
                    _this.business = data.business;
                    _this.isUser = false;
                }
                _this.loggedin = true;
            }
            else {
                _this.loggedin = false;
            }
        });
    };
    NavComponent.prototype.onLogout = function () {
        this.loginService.logout().subscribe(function (data) {
            location.reload();
        }, function (err) {
            bootbox.alert(err.msg);
        });
    };
    return NavComponent;
}());
NavComponent = __decorate([
    Component({
        selector: 'app-nav',
        templateUrl: './nav.component.html',
        styleUrls: ['./nav.component.css']
    }),
    __metadata("design:paramtypes", [AppService,
        LoginService,
        Router])
], NavComponent);
export { NavComponent };
