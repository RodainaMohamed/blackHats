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
import { Activity } from '../businessEdit/activities/activity.model';
import { Slot } from '../businessEdit/activities/slot.model';
import { BusinessPageService } from './businessPage.service';
import { BusinessService } from '../businessEdit/business.service';
import { AppService } from "../app.service";
var ActivityPageComponent = (function () {
    function ActivityPageComponent(activatedRoute, businessPageService, businessService, router, appService) {
        this.activatedRoute = activatedRoute;
        this.businessPageService = businessPageService;
        this.businessService = businessService;
        this.router = router;
        this.appService = appService;
        this.gotActivity = false;
        this.path = "http://localhost:8080/api/";
        this.dateChosen = false;
        this.loggedIn = true;
        this.noPhotos = false;
        this.noSlots = false;
        this.validDate = true;
    }
    ActivityPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var id = params['activityId'];
            _this.businessService.getActivity(id).subscribe(function (data) {
                _this.activity = new Activity(data.data.name, data.data.price, data.data.description, data.data.bookingsPerSlot, data.data.business, data.data.photos, data.data.slots, data.data.bookings, data.data._id);
                if (_this.activity.photos.length == 0) {
                    _this.noPhotos = true;
                }
                _this.appService.getCurrentUser().subscribe(function (res) {
                    if (res.success && res.user) {
                        _this.loggedIn = true;
                    }
                    else {
                        _this.loggedIn = false;
                    }
                    _this.gotActivity = true;
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
        });
        $("#back-to-top").click();
    };
    ActivityPageComponent.prototype.updateSlots = function (event) {
        var _this = this;
        var now = new Date();
        now.setHours(12);
        now.setMinutes(0);
        now.setSeconds(0);
        event.setHours(12);
        event.setMinutes(0);
        event.setSeconds(0);
        if (event < now) {
            this.validDate = false;
        }
        else {
            this.validDate = true;
        }
        this.businessPageService.getAvailableSlots(this.activity.id, event).subscribe(function (data) {
            _this.dateChosen = false;
            _this.noSlots = false;
            _this.slots = [];
            for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                var slot = _a[_i];
                _this.slots.push(new Slot(slot.startTime, slot.endTime));
            }
            if (_this.slots.length == 0) {
                _this.noSlots = true;
            }
            _this.dateChosen = true;
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
    ActivityPageComponent.prototype.bookSlot = function (index) {
        var _this = this;
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_9AEHvD0gXViwtKYQDpQcLXlY',
            locale: 'auto',
            currency: 'egp',
            token: function (token) { return _this.gotToken(token, index); }
        });
        handler.open({
            name: 'Book Activity',
            description: this.activity.name,
            amount: this.activity.price * 100
        });
    };
    ActivityPageComponent.prototype.gotToken = function (token, index) {
        var _this = this;
        this.appService.charge(token).subscribe(function (res) {
            _this.businessPageService.bookActivity(_this.slots[index], _this.activity.id, _this.chosenDate).subscribe(function (data) {
                bootbox.alert(data.msg);
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
        });
    };
    ActivityPageComponent.prototype.onBack = function () {
        this.router.navigate(["/business/" + this.activity.business]);
    };
    return ActivityPageComponent;
}());
ActivityPageComponent = __decorate([
    Component({
        selector: 'activity-page',
        templateUrl: './activityPage.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        BusinessPageService,
        BusinessService,
        Router,
        AppService])
], ActivityPageComponent);
export { ActivityPageComponent };
