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
import { ReviewsService } from './reviews.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Review } from './reviews.model';
import { AppService } from '../app.service';
var ReviewsComponent = (function () {
    function ReviewsComponent(reviewsService, router, activatedRoute, http, appService) {
        this.reviewsService = reviewsService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.http = http;
        this.appService = appService;
        this.rating = "";
        this.ratingNumber = 0;
        this.businessId = "";
        this.userId = "";
        this.businessName = "";
        this.logo = "";
        this.businessAddress = "";
        this.addressAvailable = false;
        this.businessPhoneNumbers = [];
        this.phoneNumbersAvailable = false;
        this.reviews = new Array();
        this.businessPhotos = [];
        this.path = "http://localhost:8080/api/";
        this.loadDone = false;
        this.addCommentWarning = false;
        this.addRatingWarning = false;
        this.userLoggedIn = false;
        this.noPhotos = false;
    }
    ReviewsComponent.prototype.ngOnInit = function () {
        this.initialize();
        $("#back-to-top").click();
    };
    ReviewsComponent.prototype.initialize = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.businessId = params['businessId'];
            _this.appService.getCurrentUser().subscribe(function (info) {
                if (info.success) {
                    if (info.user) {
                        _this.userLoggedIn = true;
                        _this.userId = info.user._id;
                        _this.user = info.user;
                    }
                    else {
                        _this.userLoggedIn = false;
                    }
                }
                else {
                    _this.userLoggedIn = false;
                }
            });
            _this.reviewsService.getBusinessInfo(_this.businessId).subscribe(function (info) {
                _this.businessName = info.data.name;
                _this.logo = info.data.logo;
                if (info.data.address != null) {
                    _this.businessAddress = info.data.address;
                    _this.addressAvailable = true;
                }
                if (info.data.phoneNumbers.length != 0) {
                    _this.businessPhoneNumbers = info.data.phoneNumbers;
                    _this.phoneNumbersAvailable = true;
                }
                if (info.data.photos.length != 0) {
                    _this.businessPhotos.length = info.data.photos.length - 1;
                    _this.businessPhotos[0] = info.data.photos[1];
                    for (var _i = 1; _i < _this.businessPhotos.length; _i++) {
                        _this.businessPhotos[_i] = info.data.photos[_i + 1];
                    }
                    _this.firstPhoto = info.data.photos[0];
                    _this.noPhotos = false;
                }
                else {
                    _this.noPhotos = true;
                }
                _this.loadDone = true;
                if (info.err) {
                    console.error(info.msg);
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
            _this.getAverageRating();
            _this.reviewsService.getReviews(_this.businessId).subscribe(function (info) {
                _this.reviews = info.data;
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
    ReviewsComponent.prototype.submitReview = function () {
        var _this = this;
        if (!this.addComment || this.addComment.trim().length == 0) {
            this.addCommentWarning = true;
        }
        else {
            this.addCommentWarning = false;
        }
        if (!this.addRating || this.addRating == 0) {
            this.addRatingWarning = true;
        }
        else {
            this.addRatingWarning = false;
        }
        if (!this.addCommentWarning && !this.addRatingWarning) {
            var newReview = new Review(this.addComment, this.addRating, this.businessId, { "firstName": this.user.firstName, "lastName": this.user.lastName, "_id": this.userId });
            this.reviewsService.addReview(newReview).subscribe(function (info) {
                _this.reviews.push(new Review(info.data.comment, info.data.rating, info.data.business, { "firstName": _this.user.firstName, "lastName": _this.user.lastName, "_id": info.data.user }, info.data.time));
                _this.addComment = null;
                _this.addRating = null;
                _this.getAverageRating();
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
    ReviewsComponent.prototype.hideCommentWarning = function () {
        this.addCommentWarning = false;
    };
    ReviewsComponent.prototype.hideRatingWarning = function () {
        this.addRatingWarning = false;
    };
    ReviewsComponent.prototype.getAverageRating = function () {
        var _this = this;
        this.reviewsService.getAverageRating(this.businessId).subscribe(function (info) {
            _this.rating = info.data.toFixed(1);
            _this.ratingNumber += _this.rating;
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
    return ReviewsComponent;
}());
ReviewsComponent = __decorate([
    Component({
        selector: 'app-reviews',
        templateUrl: './reviews.component.html'
    }),
    __metadata("design:paramtypes", [ReviewsService,
        Router,
        ActivatedRoute,
        Http,
        AppService])
], ReviewsComponent);
export { ReviewsComponent };
