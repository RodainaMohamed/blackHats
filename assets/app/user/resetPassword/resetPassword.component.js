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
import { ResetPasswordService } from './resetPassword.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(resetPasswordService, router, http, route) {
        this.resetPasswordService = resetPasswordService;
        this.router = router;
        this.http = http;
        this.route = route;
        //warning Flags
        this.passwordWarning = false;
        this.confirmPasswordWarning = false;
        this.resetFailureWarning = false;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
            _this.resetPasswordService.passwordToken(_this.token).subscribe(function (data) {
                _this.id = data.data.id;
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
        $("#back-to-top").click();
    };
    ResetPasswordComponent.prototype.onResetPassword = function () {
        var _this = this;
        if (!this.password || this.password.length == 0) {
            this.resetFailureWarning = false;
            this.passwordWarning = true;
            setTimeout(function () {
                _this.passwordWarning = false;
            }, 5000);
        }
        else {
            this.passwordWarning = false;
        }
        if (!this.confirmPassword || this.confirmPassword.length == 0) {
            this.resetFailureWarning = false;
            this.confirmPasswordWarning = true;
            setTimeout(function () {
                _this.confirmPasswordWarning = false;
            }, 5000);
        }
        else {
            this.confirmPasswordWarning = false;
        }
        if (!this.passwordWarning && !this.confirmPasswordWarning) {
            this.resetPasswordService.passwordId(this.id, this.password, this.confirmPassword).subscribe(function (data) {
                bootbox.alert(data.msg, function () {
                    _this.router.navigate(["/"]);
                });
            }, function (err) {
                _this.password = null;
                _this.confirmPassword = null;
                _this.resetFailureWarning = true;
                setTimeout(function () {
                    _this.resetFailureWarning = false;
                }, 5000);
                if (err.status == 500) {
                    _this.resetFailure = err.json().error[0].msg;
                }
                else {
                    _this.resetFailure = err.json().msg;
                }
            });
        }
    };
    ResetPasswordComponent.prototype.hidePasswordWarning = function () {
        this.passwordWarning = false;
    };
    ResetPasswordComponent.prototype.hideConfirmPasswordWarning = function () {
        this.confirmPasswordWarning = false;
    };
    ResetPasswordComponent.prototype.hideResetFailureWarning = function () {
        this.resetFailureWarning = false;
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    Component({
        selector: 'app-resetPass',
        templateUrl: './resetPassword.component.html'
    }),
    __metadata("design:paramtypes", [ResetPasswordService,
        Router,
        Http,
        ActivatedRoute])
], ResetPasswordComponent);
export { ResetPasswordComponent };
