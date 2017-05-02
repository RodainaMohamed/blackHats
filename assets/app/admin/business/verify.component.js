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
import { BusinessService } from './business.service';
var VerifyComponent = (function () {
    function VerifyComponent(businessService) {
        this.businessService = businessService;
        this.businesses = [];
        this.loading = false;
    }
    VerifyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessService.getUnverifiedBusinesses().subscribe(function (businesses) {
            _this.businesses = businesses;
        }, function (err) {
            bootbox.alert(err.msg);
            $('.modal-backdrop').css('z-index', '-1');
        });
    };
    VerifyComponent.prototype.isLoading = function () {
        return this.loading;
    };
    VerifyComponent.prototype.verifyBusiness = function (businessId) {
        var _this = this;
        bootbox.confirm({
            title: "Verify Business?",
            message: "Are you sure you want to verify this business?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Verify'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.businessService.verifyBusiness(businessId).subscribe(function (msg) {
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
    VerifyComponent.prototype.rejectBusiness = function (businessId) {
        var _this = this;
        bootbox.confirm({
            title: "Reject Business?",
            message: "Are you sure you want to reject this business? This cannot be undone.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Reject'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.businessService.deleteBusiness(businessId).subscribe(function (msg) {
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
    return VerifyComponent;
}());
VerifyComponent = __decorate([
    Component({
        selector: 'app-admin-business-verify',
        templateUrl: './verify.component.html'
    }),
    __metadata("design:paramtypes", [BusinessService])
], VerifyComponent);
export { VerifyComponent };
;
