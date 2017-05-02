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
import { SupportService } from './support.service';
var SupportComponent = (function () {
    function SupportComponent(supportService) {
        this.supportService = supportService;
        this.requests = [];
        this.loading = false;
    }
    SupportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.supportService.getRequests().subscribe(function (requests) {
            _this.requests = requests;
        }, function (err) {
            bootbox.alert(err.msg);
            $('.modal-backdrop').css('z-index', '-1');
        });
    };
    SupportComponent.prototype.isLoading = function () {
        return this.loading;
    };
    SupportComponent.prototype.recoverAccount = function (requestId, accountFlag) {
        var _this = this;
        bootbox.confirm({
            title: "Recover Account?",
            message: "Are you sure you want to allow this person access to his account with a temprary password? This cannot be undone.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Allow'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.supportService.recoverAccount(requestId, accountFlag).subscribe(function (msg) {
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
    SupportComponent.prototype.rejectRequest = function (requestId) {
        var _this = this;
        bootbox.confirm({
            title: "Reject Request?",
            message: "Are you sure you want to delete this request? This cannot be undone.",
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
                    _this.supportService.rejectRequest(requestId).subscribe(function (msg) {
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
    return SupportComponent;
}());
SupportComponent = __decorate([
    Component({
        selector: 'app-admin-support',
        templateUrl: './support.component.html'
    }),
    __metadata("design:paramtypes", [SupportService])
], SupportComponent);
export { SupportComponent };
;
