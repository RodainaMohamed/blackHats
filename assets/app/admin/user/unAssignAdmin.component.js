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
import { UserService } from './user.service';
var UnAssignAdminComponent = (function () {
    function UnAssignAdminComponent(userService) {
        this.userService = userService;
        this.users = [];
        this.loading = false;
    }
    UnAssignAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAdmins().subscribe(function (users) {
            _this.users = users;
        }, function (err) {
            bootbox.alert(err.msg);
            $('.modal-backdrop').css('z-index', '-1');
        });
    };
    UnAssignAdminComponent.prototype.isLoading = function () {
        return this.loading;
    };
    UnAssignAdminComponent.prototype.unAssignAdmin = function (userId) {
        var _this = this;
        bootbox.confirm({
            title: "Unassign Admin?",
            message: "Are you sure you want to unassign this user from admin position?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Unassign'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.userService.unAssignAdmin(userId).subscribe(function (msg) {
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
    return UnAssignAdminComponent;
}());
UnAssignAdminComponent = __decorate([
    Component({
        selector: 'app-admin-user-unAssignAdmin',
        templateUrl: './unAssignAdmin.component.html'
    }),
    __metadata("design:paramtypes", [UserService])
], UnAssignAdminComponent);
export { UnAssignAdminComponent };
;
