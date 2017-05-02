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
import { ActivityBookingsService } from "./activityBookings.service";
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from '../../app.service';
var ActivityBookingsComponent = (function () {
    function ActivityBookingsComponent(activityBookingsService, router, appService, http) {
        this.activityBookingsService = activityBookingsService;
        this.router = router;
        this.appService = appService;
        this.http = http;
        this.activityNames = [];
    }
    ActivityBookingsComponent.prototype.ngOnInit = function () {
        this.getActivityBookings();
    };
    ActivityBookingsComponent.prototype.getActivityBookings = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (data) {
            if (data.success && data.business) {
                _this.businessId = data.business._id;
                _this.activityBookingsService.getBookings(_this.businessId).subscribe(function (data) {
                    _this.activities = data.data;
                    for (var i = 0; i < data.data.length; i++) {
                        _this.activityNames.push(data.data[i].name);
                    }
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
            }
        });
    };
    ActivityBookingsComponent.prototype.getBookings = function (chosenActivity) {
        this.currentBookings = this.activities[chosenActivity].bookings;
    };
    return ActivityBookingsComponent;
}());
ActivityBookingsComponent = __decorate([
    Component({
        selector: 'app-activityBookings',
        templateUrl: './activityBookings.component.html',
        styleUrls: ['./activityBookings.component.css']
    }),
    __metadata("design:paramtypes", [ActivityBookingsService,
        Router,
        AppService,
        Http])
], ActivityBookingsComponent);
export { ActivityBookingsComponent };
