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
import { UserService } from '../user.service';
import { AppService } from '../../app.service';
import { Http } from '@angular/http';
import { UserComponent } from "../user.component";
import 'rxjs/add/operator/map';
var UserFavoritesComponent = (function () {
    function UserFavoritesComponent(activatedRoute, userComponent, appService, userService, router, http) {
        this.activatedRoute = activatedRoute;
        this.userComponent = userComponent;
        this.appService = appService;
        this.userService = userService;
        this.router = router;
        this.http = http;
        this.userId = "";
        this.logoPath = "http://localhost:8080/api/image/businessLogos/";
    }
    UserFavoritesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedIn = this.userComponent.isLoggedIn();
        this.activatedRoute.params.subscribe(function (params) {
            _this.userId = params['userId'];
            _this.appService.getCurrentUser().subscribe(function (data) {
                if (data.success) {
                    if (data.user) {
                        _this.isUser = true;
                        if (_this.userId == data.user._id) {
                            _this.loggedIn = true;
                        }
                        else {
                            _this.loggedIn = false;
                        }
                    }
                    else {
                        _this.loggedIn = false;
                    }
                }
                else {
                    _this.loggedin = false;
                }
                _this.userService.getOneUser(_this.userId).subscribe(function (data) {
                    _this.user = data.data;
                    _this.favorites = data.data.favorites;
                    var businesses = [];
                    for (var i = 0; i < _this.favorites.length; i++) {
                        _this.userService.getCurrentInfo(_this.favorites[i]).subscribe(function (data) {
                            businesses.push(data.data);
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
                    _this.businesses = businesses;
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
    UserFavoritesComponent.prototype.deleteFavorite = function (i) {
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
                    _this.userService.deleteFavorite(_this.favorites[i]).subscribe(function (data) {
                        _this.businesses.splice(i, 1);
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
    return UserFavoritesComponent;
}());
UserFavoritesComponent = __decorate([
    Component({
        selector: 'app-user-favorites',
        templateUrl: './favorites.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        UserComponent,
        AppService,
        UserService,
        Router,
        Http])
], UserFavoritesComponent);
export { UserFavoritesComponent };
