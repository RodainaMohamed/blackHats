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
import { UserComponent } from "../user.component";
var ReviewComponent = (function () {
    function ReviewComponent(activatedRoute, userComponent, appService, userService, router, http) {
        this.activatedRoute = activatedRoute;
        this.userComponent = userComponent;
        this.appService = appService;
        this.userService = userService;
        this.router = router;
        this.http = http;
        this.count = 0;
        this.userId = "";
        this.editing = [];
        this.editIndex = 0;
        this.isUser = false;
        this.editCommentWarning = false;
    }
    ReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
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
                    _this.loggedIn = false;
                }
                _this.userService.getReviews(_this.userId).subscribe(function (data) {
                    _this.reviews = data.data;
                    _this.count = _this.reviews.length;
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
    ReviewComponent.prototype.onDelete = function (i) {
        var _this = this;
        bootbox.confirm({
            title: "Delete Review",
            message: "Are you sure you want to delete this review?",
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
                    _this.editIndex = i;
                    _this.userService.deleteReview(_this.reviews[i]._id).subscribe(function (data) {
                        _this.reviews.splice(i, 1);
                        _this.editing[i] = false;
                        _this.count = _this.count - 1;
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
    ReviewComponent.prototype.onSave = function (i) {
        var _this = this;
        if (!this.editComment || this.editComment.trim().length == 0) {
            return this.editCommentWarning = true;
        }
        else {
            this.editCommentWarning = false;
        }
        this.editIndex = i;
        this.userService.editReview(this.reviews[i]._id, this.editComment, this.editRating).subscribe(function (data) {
            _this.reviews[i].comment = _this.editComment;
            _this.reviews[i].rating = _this.editRating;
            _this.editing[i] = false;
            _this.editComment = null;
            _this.editRating = null;
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
    ReviewComponent.prototype.onCancel = function (i) {
        this.editIndex = i;
        this.editing[i] = false;
        this.hideCommentWarning();
    };
    ReviewComponent.prototype.onEdit = function (i) {
        for (var j = 0; j < this.editing.length; j++) {
            this.editing[j] = false;
        }
        this.editing[i] = true;
        this.editComment = this.reviews[i].comment;
        this.editRating = this.reviews[i].rating;
    };
    ReviewComponent.prototype.hideCommentWarning = function () {
        this.editCommentWarning = false;
    };
    return ReviewComponent;
}());
ReviewComponent = __decorate([
    Component({
        selector: 'user-review',
        templateUrl: './review.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        UserComponent,
        AppService,
        UserService,
        Router,
        Http])
], ReviewComponent);
export { ReviewComponent };
