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
import { Activity } from './activity.model';
import { Slot } from './slot.model';
import { BusinessService } from '../business.service';
import { EventEmitter } from "@angular/common/src/facade/async";
var EditActivityComponent = (function () {
    function EditActivityComponent(activatedRoute, businessService, router) {
        this.activatedRoute = activatedRoute;
        this.businessService = businessService;
        this.router = router;
        this.gotActivity = false;
        this.path = "http://localhost:8080/api/";
        this.myFocusTriggeringEventEmitterOne = new EventEmitter();
        this.myFocusTriggeringEventEmitterTwo = new EventEmitter();
        this.showFakeInput = false;
        //warning
        this.nameWarning = false;
        this.addSlotWarning = false;
        this.warningMessage = "";
        this.depositWarning = false;
        this.descriptionWarning = false;
        this.priceWarning = false;
        this.perSlotWarning = false;
    }
    EditActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var id = params['activityId'];
            _this.config = {
                server: 'http://localhost:8080/api/activity/' + id + '/addPhoto',
                paramName: 'myfile'
            };
            _this.businessService.getActivity(id).subscribe(function (data) {
                _this.activity = new Activity(data.data.name, data.data.price, data.data.description, data.data.bookingsPerSlot, data.data.business, data.data.photos, data.data.slots, data.data.bookings, data.data._id);
                _this.gotActivity = true;
                _this.name = _this.activity.name;
                _this.description = _this.activity.description;
                _this.price = _this.activity.price;
                _this.perSlot = _this.activity.bookingsPerSlot;
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
    EditActivityComponent.prototype.onSave = function () {
        var _this = this;
        if (!this.name || this.name.trim().length == 0) {
            this.nameWarning = true;
        }
        else {
            this.nameWarning = false;
        }
        if (!this.description || this.description.trim().length == 0) {
            this.descriptionWarning = true;
        }
        else {
            this.descriptionWarning = false;
        }
        if (!this.price || this.price == 0) {
            this.priceWarning = true;
        }
        else {
            this.priceWarning = false;
        }
        if (!this.perSlot || this.perSlot == 0) {
            this.perSlotWarning = true;
        }
        else {
            this.perSlotWarning = false;
        }
        if (!this.descriptionWarning && !this.nameWarning && !this.priceWarning && !this.perSlotWarning) {
            this.activity.name = this.name;
            this.activity.description = this.description;
            this.activity.price = this.price;
            this.activity.bookingsPerSlot = this.perSlot;
            this.businessService.editActivity(this.activity).subscribe(function (data) {
                _this.router.navigate(["/businessEdit"]);
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
        else {
            $("#back-to-top").click();
        }
    };
    EditActivityComponent.prototype.onDelete = function () {
        var _this = this;
        bootbox.confirm({
            title: "Delete activity",
            message: "Are you sure you want to delete this activity?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.businessService.deleteActivity(_this.activity).subscribe(function (data) {
                        _this.router.navigate(["/businessEdit"]);
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
            }
        });
    };
    EditActivityComponent.prototype.onCancel = function () {
        this.router.navigate(["/businessEdit"]);
    };
    EditActivityComponent.prototype.deleteSlot = function (index) {
        var _this = this;
        bootbox.confirm({
            title: "Delete slot",
            message: "Are you sure you want to delete this slot?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.businessService.deleteSlot(_this.activity.slots[index], _this.activity).subscribe(function (data) {
                        _this.activity.slots.splice(index, 1);
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
            }
        });
    };
    EditActivityComponent.prototype.hideSlotWarning = function () {
        this.addSlotWarning = false;
    };
    EditActivityComponent.prototype.hideNameWarning = function () {
        this.nameWarning = false;
    };
    EditActivityComponent.prototype.hideDescriptionWarning = function () {
        this.descriptionWarning = false;
    };
    EditActivityComponent.prototype.hidePriceWarning = function () {
        this.priceWarning = false;
    };
    EditActivityComponent.prototype.hidePerSlotWarning = function () {
        this.perSlotWarning = false;
    };
    EditActivityComponent.prototype.addSlot = function () {
        var _this = this;
        if (this.newStart && this.newEnd) {
            if (this.newStart > this.newEnd) {
                this.warningMessage = "End Time has to be after the Start Time";
                this.addSlotWarning = true;
                setTimeout(function () {
                    _this.addSlotWarning = false;
                }, 5000);
            }
            else {
                var newSlot_1 = new Slot(this.newStart, this.newEnd);
                this.businessService.addSlot(newSlot_1, this.activity).subscribe(function (data) {
                    _this.activity.slots.push(newSlot_1);
                    _this.activity.slots.sort(function (a, b) {
                        var one = b.startTime;
                        var two = a.startTime;
                        one.setDate(12);
                        one.setMonth(12);
                        one.setFullYear(2012);
                        two.setDate(12);
                        two.setMonth(12);
                        two.setFullYear(2012);
                        return this.two - this.one;
                    });
                    _this.newStart = null;
                    _this.newEnd = null;
                    _this.addSlotWarning = false;
                }, function (err) {
                    switch (err.status) {
                        case 405:
                            _this.warningMessage = "This slot overlaps another slot";
                            _this.addSlotWarning = true;
                            break;
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
        }
        else {
            this.warningMessage = "Please choose a start and end time";
            this.addSlotWarning = true;
            setTimeout(function () {
                _this.addSlotWarning = false;
            }, 5000);
        }
    };
    EditActivityComponent.prototype.onUploadError = function (args) {
    };
    EditActivityComponent.prototype.onUploadSuccess = function (event) {
        this.activity.photos.push(event[1].data);
        this.myFocusTriggeringEventEmitterOne.emit(true);
        this.myFocusTriggeringEventEmitterTwo.emit(true);
    };
    EditActivityComponent.prototype.deletePhoto = function (index) {
        var _this = this;
        bootbox.confirm({
            title: "Delete Phot",
            message: "Are you sure you want to delete this photo?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.businessService.deleteActivityPhoto(_this.activity.photos[index], _this.activity).subscribe(function (date) {
                        _this.activity.photos.splice(index, 1);
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
            }
        });
    };
    return EditActivityComponent;
}());
EditActivityComponent = __decorate([
    Component({
        selector: 'activity-edit',
        templateUrl: './editActivity.component.html',
        styleUrls: ['./businessActivities.component.css']
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        BusinessService,
        Router])
], EditActivityComponent);
export { EditActivityComponent };
