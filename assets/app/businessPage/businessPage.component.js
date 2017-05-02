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
import { BusinessPageService } from './businessPage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AppService } from '../app.service';
import { DirectMessagingService } from '../directMessaging/directMessaging.service';
var BusinessPageComponent = (function () {
    function BusinessPageComponent(businessPageService, router, activatedRoute, http, appService, directMessagingService, route) {
        this.businessPageService = businessPageService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.appService = appService;
        this.directMessagingService = directMessagingService;
        this.route = route;
        this.name = "";
        this.logo = "";
        this.address = "";
        this.addressAvailable = false;
        this.email = "";
        this.phoneNumbers = [];
        this.phoneNumbersAvailable = false;
        this.workingDays = [];
        this.workingDaysAvailable = false;
        this.workingFrom = "";
        this.workingTo = "";
        this.workingHoursAvailable = false;
        this.description = "";
        this.rating = "";
        this.activities = new Array();
        this.categoryAvailable = false;
        this.businessId = "";
        this.path = "http://localhost:8080/api/";
        this.reviews = new Array();
        this.photos = [];
        this.firstPhoto = "";
        this.depositAvailable = false;
        this.loadDone = false;
        this.ownerLoggedIn = false;
        this.userLoggedIn = false;
        this.favorited = false;
        this.noPhotos = false;
        this.activitiesAvailable = false;
        this.reviewsAvailable = false;
        this.test = 3;
        this.messageDone = false;
    }
    BusinessPageComponent.prototype.ngOnInit = function () {
        this.initialize();
        $("#back-to-top").click();
    };
    BusinessPageComponent.prototype.initialize = function () {
        var _this = this;
        this.messageDone = false;
        this.activatedRoute.params.subscribe(function (params) {
            _this.businessId = params['businessId'];
            _this.appService.getCurrentUser().subscribe(function (info) {
                if (info.success) {
                    if (info.user) {
                        _this.user = info.user._id;
                        _this.userLoggedIn = true;
                        _this.ownerLoggedIn = false;
                        if (info.user.favorites.includes(_this.businessId)) {
                            _this.favorited = true;
                        }
                        else {
                            _this.favorited = false;
                        }
                    }
                    else if (info.business._id == _this.businessId) {
                        _this.ownerLoggedIn = true;
                        _this.userLoggedIn = false;
                    }
                    else {
                        _this.ownerLoggedIn = false;
                        _this.userLoggedIn = false;
                    }
                }
                else {
                    _this.ownerLoggedIn = false;
                    _this.userLoggedIn = false;
                }
            });
            _this.businessPageService.getBusinessInfo(_this.businessId).subscribe(function (info) {
                _this.name = info.data.name;
                _this.logo = info.data.logo;
                if (info.data.address != null) {
                    _this.address = info.data.address;
                    _this.addressAvailable = true;
                }
                if (info.data.phoneNumbers.length != 0) {
                    _this.phoneNumbers = info.data.phoneNumbers;
                    _this.phoneNumbersAvailable = true;
                }
                _this.description = info.data.description;
                if (info.data.workingDays.length != 0) {
                    _this.workingDays = info.data.workingDays;
                    _this.workingDaysAvailable = true;
                }
                _this.email = info.data.email;
                if (info.data.category != null) {
                    _this.category = info.data.category;
                    _this.categoryAvailable = true;
                }
                if (info.data.workingHours != null) {
                    _this.workingFrom = info.data.workingHours.from;
                    _this.workingTo = info.data.workingHours.to;
                    _this.workingHoursAvailable = true;
                }
                if (info.data.photos.length != 0) {
                    _this.photos.length = info.data.photos.length - 1;
                    if (info.data.photos.length > 1)
                        _this.photos[0] = info.data.photos[1];
                    for (var _i = 1; _i < _this.photos.length; _i++) {
                        _this.photos[_i] = info.data.photos[_i + 1];
                    }
                    _this.firstPhoto = info.data.photos[0];
                    _this.noPhotos = false;
                }
                else {
                    _this.noPhotos = true;
                }
                _this.paymentRequired = info.data.paymentRequired;
                if (info.data.deposit != null) {
                    _this.deposit = info.data.deposit;
                    _this.depositAvailable = true;
                }
                switch (_this.paymentRequired) {
                    case 1:
                        _this.paymentStatus = "Full payment needed in advance.";
                        break;
                    case 2:
                        _this.paymentStatus = "A " + _this.deposit + "% deposit needed in advance.";
                        break;
                    case 3:
                        _this.paymentStatus = "No payment needed in advance.";
                        break;
                    default: _this.paymentStatus = "No payment needed in advance.";
                }
                _this.loadDone = true;
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
            _this.businessPageService.getAverageRating(_this.businessId).subscribe(function (info) {
                _this.rating = info.data.toFixed(1);
                _this.ratingNumber = info.data;
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
            _this.businessPageService.getActivities(_this.businessId).subscribe(function (info) {
                _this.activities = info.data;
                if (_this.activities.length != 0) {
                    _this.activitiesAvailable = true;
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
            _this.businessPageService.getReviews(_this.businessId).subscribe(function (info) {
                _this.reviews = info.data;
                if (_this.reviews.length != 0) {
                    _this.reviewsAvailable = true;
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
            _this.businessPageService.updateInteractivity(_this.businessId).subscribe(function (info) {
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
    BusinessPageComponent.prototype.addFavorite = function () {
        var _this = this;
        this.businessPageService.addFavorite(this.businessId).subscribe(function (info) {
            _this.favorited = true;
            _this.initialize();
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
    BusinessPageComponent.prototype.deleteFavorite = function () {
        var _this = this;
        bootbox.confirm({
            title: "Delete Favorite",
            message: "Are you sure you want to remove this business from your favorites?",
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
                    _this.businessPageService.deleteFavorite(_this.businessId).subscribe(function (data) {
                        _this.favorited = false;
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
    BusinessPageComponent.prototype.truncate = function (text) {
        if (text.length > 100) {
            var newText = text.slice(0, 90);
            newText += "...";
            return newText;
        }
        return text;
    };
    BusinessPageComponent.prototype.sendMessage = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.business = params['businessId'];
            _this.destID = params['businessId'];
            _this.directMessagingService.existingThread(_this.user, _this.business).subscribe(function (thread) {
                if (thread.data) {
                    _this.thread = thread.data;
                    _this.directMessagingService.addMessage(_this.thread._id, _this.message).subscribe(function (data) {
                        console.log("done");
                        _this.messageDone = true;
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
                    _this.directMessagingService.newThread(_this.destID, _this.message).subscribe(function (thread) {
                        console.log("done");
                        _this.thread = thread.data;
                        _this.messageDone = true;
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
    BusinessPageComponent.prototype.onMessageDone = function () {
        this.messageDone = false;
        this.message = null;
    };
    BusinessPageComponent.prototype.goToMessages = function () {
        this.router.navigateByUrl('/chat');
    };
    BusinessPageComponent.prototype.onMessageCancel = function () {
        this.message = null;
    };
    return BusinessPageComponent;
}());
BusinessPageComponent = __decorate([
    Component({
        selector: 'app-business-page',
        templateUrl: './businessPage.component.html',
        styleUrls: ['./businessPage.component.css']
    }),
    __metadata("design:paramtypes", [BusinessPageService,
        Router,
        ActivatedRoute,
        Http,
        AppService,
        DirectMessagingService,
        ActivatedRoute])
], BusinessPageComponent);
export { BusinessPageComponent };
