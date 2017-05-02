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
import { Router } from '@angular/router';
import { UserService } from './user.service';
var ReviewComponent = (function () {
    function ReviewComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.users = [];
        this.loading = false;
    }
    ReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (users) {
            _this.userService.getUnverifiedUsers().subscribe(function (tempUsers) {
                _this.users = users.concat(tempUsers);
            }, function (err) {
                bootbox.alert(err.msg);
                $('.modal-backdrop').css('z-index', '-1');
            });
        });
    };
    ReviewComponent.prototype.isLoading = function () {
        return this.loading;
    };
    ReviewComponent.prototype.deleteUser = function (userId, verified) {
        var _this = this;
        bootbox.confirm({
            title: "Delete User?",
            message: "Are you sure you want to delete this user? This cannot be undone.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Delete'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.userService.deleteUser(userId, verified).subscribe(function (msg) {
                        bootbox.alert(msg, function () {
                            location.reload();
                        });
                        $('.modal-backdrop').css('z-index', '-1');
                    }, function (err) {
                        bootbox.alert(err.msg, function () {
                            location.reload();
                        });
                        $('.modal-backdrop').css('z-index', '-1');
                    });
                }
            }
        });
        $('.modal-backdrop').css('z-index', '-1');
    };
    ReviewComponent.prototype.viewUser = function (userId) {
        window.location.href = "/user/" + userId;
    };
    return ReviewComponent;
}());
ReviewComponent = __decorate([
    Component({
        selector: 'app-admin-user-review',
        templateUrl: './review.component.html'
    }),
    __metadata("design:paramtypes", [UserService, Router])
], ReviewComponent);
export { ReviewComponent };
;
