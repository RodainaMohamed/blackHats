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
import { UserService } from "./user.service";
import { AppService } from '../app.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var UserComponent = (function () {
    function UserComponent(activatedRoute, appService, userService, router, http) {
        this.activatedRoute = activatedRoute;
        this.appService = appService;
        this.userService = userService;
        this.router = router;
        this.http = http;
        this.showReviews = true;
        this.showFavorites = false;
        this.showBookings = false;
        this.editProfile = false;
        this.userId = "";
        this.path = "";
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        //getting the userId in the route:
        this.activatedRoute.params.subscribe(function (params) {
            _this.userId = params['userId'];
            _this.appService.getCurrentUser().subscribe(function (data) {
                //if the logged in user has the same ud as the id in the route
                if (data.success && data.user && data.user._id == _this.userId) {
                    //case 1: a user is logged in:
                    _this.loggedin = true;
                    _this.user = data.user;
                    _this.firstName = data.user.firstName;
                    _this.lastName = data.user.lastName;
                    _this.email = data.user.email;
                    _this.birthDate = data.user.birthDate;
                    _this.createdAt = data.user.createdAt;
                    if (data.user.profilePicture != null) {
                        _this.path = "http://localhost:8080/api/image/profilePictures/";
                        _this.profilePicture = data.user.profilePicture;
                    }
                    else {
                        _this.path = "";
                        _this.profilePicture = "http://localhost:8080/api/image/profilePictures/defaultpp.jpg";
                    }
                }
                else {
                    _this.loggedin = false;
                    _this.userService.getOneUser(_this.userId).subscribe(function (info) {
                        _this.user = info.data;
                        _this.firstName = info.data.firstName;
                        _this.lastName = info.data.lastName;
                        _this.email = info.data.email;
                        _this.birthDate = info.data.birthDate;
                        _this.createdAt = info.data.createdAt;
                        if (info.data.profilePicture != null) {
                            _this.path = "http://localhost:8080/api/image/profilePictures/";
                            _this.profilePicture = info.data.profilePicture;
                        }
                        else {
                            _this.path = "";
                            _this.profilePicture = "http://localhost:8080/api/image/profilePictures/defaultpp.jpg";
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
        $("#back-to-top").click();
    };
    UserComponent.prototype.onReviewsClick = function () {
        this.showReviews = true;
        this.showFavorites = false;
        this.showBookings = false;
        this.editProfile = false;
    };
    UserComponent.prototype.onFavoritesClick = function () {
        this.showReviews = false;
        this.showFavorites = true;
        this.showBookings = false;
        this.editProfile = false;
    };
    UserComponent.prototype.onBookingsClick = function () {
        this.showReviews = false;
        this.showFavorites = false;
        this.showBookings = true;
        this.editProfile = false;
    };
    UserComponent.prototype.onEditProfileClick = function () {
        this.showReviews = false;
        this.showFavorites = false;
        this.showBookings = false;
        this.editProfile = true;
    };
    UserComponent.prototype.isLoggedIn = function () {
        return this.loggedin;
    };
    UserComponent.prototype.pictureChanged = function (path) {
        this.path = "http://localhost:8080/api/image/profilePictures/";
        this.profilePicture = path;
    };
    return UserComponent;
}());
UserComponent = __decorate([
    Component({
        selector: 'user-profile',
        templateUrl: 'user.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        AppService,
        UserService,
        Router,
        Http])
], UserComponent);
export { UserComponent };
