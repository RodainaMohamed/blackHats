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
var AssignAdminComponent = (function () {
    function AssignAdminComponent(userService) {
        this.userService = userService;
        this.users = [];
        this.loading = false;
    }
    AssignAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getNonAdmins().subscribe(function (users) {
            _this.users = users;
        }, function (err) {
            bootbox.alert(err.msg);
        });
        $('.modal-backdrop').css('z-index', '-1');
    };
    AssignAdminComponent.prototype.isLoading = function () {
        return this.loading;
    };
    AssignAdminComponent.prototype.assignAdmin = function (userId) {
        var _this = this;
        bootbox.confirm({
            title: "Assign Admin?",
            message: "Are you sure you want to assign this user as an admin?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Assign'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.userService.assignAdmin(userId).subscribe(function (msg) {
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
    return AssignAdminComponent;
}());
AssignAdminComponent = __decorate([
    Component({
        selector: 'app-admin-user-assignAdmin',
        templateUrl: './assignAdmin.component.html'
    }),
    __metadata("design:paramtypes", [UserService])
], AssignAdminComponent);
export { AssignAdminComponent };
;
