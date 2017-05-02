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
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import { AppService } from '../../app.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var UserBookingsComponent = (function () {
    function UserBookingsComponent(activatedRoute, appService, userService, router, http) {
        this.activatedRoute = activatedRoute;
        this.appService = appService;
        this.userService = userService;
        this.router = router;
        this.http = http;
        this.count = 0;
        this.logoPath = "http://localhost:8080/api/image/businessLogos/";
        this.loaded = false;
    }
    UserBookingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.userId = params['userId'];
            _this.userService.getBookingHistory(_this.userId).subscribe(function (data) {
                _this.bookings = data.data;
                _this.count = _this.bookings.length;
                _this.loaded = true;
            }, function (err) {
                switch (err.status) {
                    case 404:
                        _this.router.navigateByUrl('/404-error');
                        break;
                    case 401:
                        _this.router.navigateByUrl('/notAuthorized-error');
                        break;
                    default:
                        _this.router.navigateByUrl('/500-error');
                        break;
                }
            });
        }, function (err) {
            switch (err.status) {
                case 404:
                    _this.router.navigateByUrl('/404-error');
                    break;
                case 401:
                    _this.router.navigateByUrl('/notAuthorized-error');
                    break;
                default:
                    _this.router.navigateByUrl('/500-error');
                    break;
            }
        });
    };
    return UserBookingsComponent;
}());
UserBookingsComponent = __decorate([
    Component({
        selector: 'app-user-bookings',
        templateUrl: './userBookings.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        AppService,
        UserService,
        Router,
        Http])
], UserBookingsComponent);
export { UserBookingsComponent };
