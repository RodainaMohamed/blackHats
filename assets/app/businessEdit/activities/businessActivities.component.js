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
import { BusinessService } from '../business.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Activity } from './activity.model';
import 'rxjs/add/operator/map';
var BusinessActivitiesComponent = (function () {
    function BusinessActivitiesComponent(activatedRoute, businessService, router) {
        this.activatedRoute = activatedRoute;
        this.businessService = businessService;
        this.router = router;
        this.activities = [];
        this.path = "http://localhost:8080/api/";
        this.currentIndex = 0;
        this.showEdit = false;
        this.addDone = false;
        this.editDone = false;
        //warning Flags
        this.addNameWarning = false;
        this.addDescriptionWarning = false;
        this.addPriceWarning = false;
        this.addPerSlotWarning = false;
        this.editNameWarning = false;
        this.editDescriptionWarning = false;
        this.editPriceWarning = false;
        this.editPerSlotWarning = false;
    }
    BusinessActivitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessService.getCurrentUser().subscribe(function (res) {
            _this.business = res.business;
            _this.businessService.getActivities(_this.business._id).subscribe(function (acts) {
                _this.activities = acts;
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
    BusinessActivitiesComponent.prototype.truncate = function (text) {
        if (text.length > 100) {
            var newText = text.slice(0, 90);
            newText += "...";
            return newText;
        }
        return text;
    };
    BusinessActivitiesComponent.prototype.onEdit = function (index) {
        this.currentIndex = index;
        this.showEdit = true;
        this.router.navigate(["/businessEdit/activity/" + this.activities[index].id]);
    };
    BusinessActivitiesComponent.prototype.onAddSubmit = function () {
        var _this = this;
        if (!this.addName || this.addName.trim().length == 0) {
            this.addNameWarning = true;
        }
        else {
            this.addNameWarning = false;
        }
        if (!this.addDescription || this.addDescription.trim().length == 0) {
            this.addDescriptionWarning = true;
        }
        else {
            this.addDescriptionWarning = false;
        }
        if (!this.addPrice || this.addPrice == 0) {
            this.addPriceWarning = true;
        }
        else {
            this.addPriceWarning = false;
        }
        if (!this.addPerSlot || this.addPerSlot == 0) {
            this.addPerSlotWarning = true;
        }
        else {
            this.addPerSlotWarning = false;
        }
        if (!this.addNameWarning && !this.addDescriptionWarning && !this.addPriceWarning && !this.addPerSlotWarning) {
            var newActivity = new Activity(this.addName, this.addPrice, this.addDescription, this.addPerSlot);
            this.addName = null;
            this.addDescription = null;
            this.addPrice = null;
            this.addPerSlot = null;
            this.businessService.addActivity(newActivity).subscribe(function (data) {
                _this.addDone = true;
                _this.activities.push(new Activity(data.data.name, data.data.price, data.data.description, data.data.bookingsPerSlot, data.data.business, data.data.photos, data.data.slots, data.data.bookings, data.data._id));
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
    };
    BusinessActivitiesComponent.prototype.hideNameWarning = function () {
        this.addNameWarning = false;
    };
    BusinessActivitiesComponent.prototype.hideDescriptionWarning = function () {
        this.addDescriptionWarning = false;
    };
    BusinessActivitiesComponent.prototype.hidePriceWarning = function () {
        this.addPriceWarning = false;
    };
    BusinessActivitiesComponent.prototype.hidePerSlotWarning = function () {
        this.addPerSlotWarning = false;
    };
    BusinessActivitiesComponent.prototype.hideEditNameWarning = function () {
        this.editNameWarning = false;
    };
    BusinessActivitiesComponent.prototype.hideEditDescriptionWarning = function () {
        this.editDescriptionWarning = false;
    };
    BusinessActivitiesComponent.prototype.hideEditPriceWarning = function () {
        this.editPriceWarning = false;
    };
    BusinessActivitiesComponent.prototype.hideEditPerSlotWarning = function () {
        this.editPerSlotWarning = false;
    };
    BusinessActivitiesComponent.prototype.onAddDone = function () {
        var _this = this;
        setTimeout(function () {
            _this.addDone = false;
        }, 10);
    };
    BusinessActivitiesComponent.prototype.onAddCancel = function () {
        this.addName = null;
        this.addDescription = null;
        this.addPrice = null;
        this.addPerSlot = null;
        this.addDone = false;
        this.addNameWarning = false;
        this.addDescriptionWarning = false;
        this.addPriceWarning = false;
        this.addPerSlotWarning = false;
    };
    BusinessActivitiesComponent.prototype.onSave = function () {
        this.editDone = true;
    };
    BusinessActivitiesComponent.prototype.onSaveDone = function () {
    };
    BusinessActivitiesComponent.prototype.onEditCancel = function () {
        this.editDone = false;
        this.showEdit = false;
    };
    return BusinessActivitiesComponent;
}());
BusinessActivitiesComponent = __decorate([
    Component({
        selector: 'app-businessEdit-activities',
        templateUrl: './businessActivities.component.html',
        styleUrls: ['./businessActivities.component.css']
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        BusinessService,
        Router])
], BusinessActivitiesComponent);
export { BusinessActivitiesComponent };
