var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var LoginComponent = (function () {
    function LoginComponent(loginService, router, http, appService) {
        this.loginService = loginService;
        this.router = router;
        this.http = http;
        this.appService = appService;
        this.loginClicked = new EventEmitter();
        //warning Flags
        this.userUsernameWarning = false;
        this.userPasswordWarning = false;
        this.businessEmailWarning = false;
        this.businessPasswordWarning = false;
        this.incorrectUserWarning = false;
        this.incorrectBusinessWarning = false;
        this.resetUserEmailWarning = false;
        this.resetBusinessEmailWarning = false;
        this.resetSuccessWarning = false;
        this.resetFailureWarning = false;
        this.resetBusinessSuccessWarning = false;
        this.resetBusinessFailureWarning = false;
        this.loggedin = false;
        this.resendEmailWarning = false;
        this.resendSuccessWarning = false;
        this.resendFailureWarning = false;
    }
    LoginComponent.prototype.onUserLogin = function () {
        var _this = this;
        if (!this.username || this.username.length == 0) {
            this.incorrectUserWarning = false;
            this.userUsernameWarning = true;
            setTimeout(function () {
                _this.userUsernameWarning = false;
            }, 5000);
        }
        else {
            this.userUsernameWarning = false;
        }
        if (!this.userPassword || this.userPassword.length == 0) {
            this.incorrectUserWarning = false;
            this.userPasswordWarning = true;
            setTimeout(function () {
                _this.userPasswordWarning = false;
            }, 5000);
        }
        else {
            this.userPasswordWarning = false;
        }
        if (!this.userUsernameWarning && !this.userPasswordWarning) {
            this.loginService.userLogin(this.username, this.userPassword).subscribe(function (data) {
                if (data.success) {
                    _this.loggedin = true;
                    setTimeout(function () {
                        $("#userLoginClose").click();
                        // this.loginClicked.emit();
                        location.reload();
                    }, 1000);
                }
                else {
                    _this.incorrectUserWarning = true;
                    setTimeout(function () {
                        _this.incorrectUserWarning = false;
                    }, 5000);
                    _this.username = null;
                    _this.userPassword = null;
                }
            }, function (err) {
                bootbox.alert(err.msg);
            });
        }
    };
    LoginComponent.prototype.onBusinessLogin = function () {
        var _this = this;
        if (!this.businessEmail || this.businessEmail.length == 0) {
            this.incorrectBusinessWarning = false;
            this.businessEmailWarning = true;
            setTimeout(function () {
                _this.businessEmailWarning = false;
            }, 5000);
        }
        else {
            this.businessEmailWarning = false;
        }
        if (!this.businessPassword || this.businessPassword.length == 0) {
            this.incorrectBusinessWarning = false;
            this.businessPasswordWarning = true;
            setTimeout(function () {
                _this.businessPasswordWarning = false;
            }, 5000);
        }
        else {
            this.businessPasswordWarning = false;
        }
        if (!this.businessEmailWarning && !this.businessPasswordWarning) {
            this.loginService.businessLogin(this.businessEmail, this.businessPassword).subscribe(function (data) {
                if (data.success) {
                    _this.loggedin = true;
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
                else {
                    _this.incorrectBusinessWarning = true;
                    setTimeout(function () {
                        _this.incorrectBusinessWarning = false;
                    }, 5000);
                    _this.businessEmail = null;
                    _this.businessPassword = null;
                }
            }, function (err) {
                bootbox.alert(err.msg);
            });
        }
    };
    LoginComponent.prototype.onUserForgetPass = function () {
        var _this = this;
        if (!this.userEmail || this.userEmail.length == 0) {
            this.resetUserEmailWarning = true;
            setTimeout(function () {
                _this.resetUserEmailWarning = false;
            }, 5000);
        }
        else {
            this.resetUserEmailWarning = false;
        }
        if (!this.resetUserEmailWarning) {
            this.loginService.forgetPassword(this.userEmail).subscribe(function (data) {
                _this.resetFailureWarning = false;
                _this.resetSuccessWarning = true;
                setTimeout(function () {
                    _this.resetSuccessWarning = false;
                }, 5000);
                _this.successReset = data.msg;
            }, function (err) {
                _this.resetSuccessWarning = false;
                _this.resetFailureWarning = true;
                setTimeout(function () {
                    _this.resetFailureWarning = false;
                }, 5000);
                if (err.status == 500) {
                    _this.failedReset = err.json().error[0].msg;
                }
                else {
                    _this.failedReset = err.json().msg;
                }
            });
        }
    };
    LoginComponent.prototype.onBusinessForgetPass = function () {
        var _this = this;
        if (!this.businessEmail || this.businessEmail.length == 0) {
            this.resetBusinessEmailWarning = true;
            setTimeout(function () {
                _this.resetBusinessEmailWarning = false;
            }, 5000);
        }
        else {
            this.resetBusinessEmailWarning = false;
        }
        if (!this.resetBusinessEmailWarning) {
            this.loginService.forgetPassword(this.businessEmail).subscribe(function (data) {
                _this.resetFailureWarning = false;
                _this.resetSuccessWarning = true;
                setTimeout(function () {
                    _this.resetSuccessWarning = false;
                }, 5000);
                _this.successReset = data.msg;
            }, function (err) {
                _this.resetSuccessWarning = false;
                _this.resetFailureWarning = true;
                setTimeout(function () {
                    _this.resetFailureWarning = false;
                }, 5000);
                if (err.status == 500) {
                    _this.failedReset = err.json().error[0].msg;
                }
                else {
                    _this.failedReset = err.json().msg;
                }
            });
        }
    };
    LoginComponent.prototype.onResendEmail = function () {
        var _this = this;
        if (!this.userEmail || this.userEmail.length == 0) {
            this.resendEmailWarning = true;
            setTimeout(function () {
                _this.resendEmailWarning = false;
            }, 5000);
        }
        else {
            this.resendEmailWarning = false;
        }
        if (!this.resendEmailWarning) {
            this.loginService.resendEmail(this.userEmail).subscribe(function (data) {
                _this.resendFailureWarning = false;
                _this.resendSuccessWarning = true;
                setTimeout(function () {
                    _this.resendSuccessWarning = false;
                }, 5000);
                _this.successResend = data.msg;
            }, function (err) {
                _this.resendSuccessWarning = false;
                _this.resendFailureWarning = true;
                setTimeout(function () {
                    _this.resendFailureWarning = false;
                }, 5000);
                if (err.status == 500) {
                    _this.failedResend = err.json().error[0].msg;
                }
                else {
                    _this.failedResend = err.json().msg;
                }
            });
        }
    };
    LoginComponent.prototype.hideuserUsernameWarning = function () {
        this.userUsernameWarning = false;
    };
    LoginComponent.prototype.hideuserPasswordWarning = function () {
        this.userPasswordWarning = false;
    };
    LoginComponent.prototype.hidebusinessEmailWarning = function () {
        this.businessEmailWarning = false;
    };
    LoginComponent.prototype.hidebusinessPasswordWarning = function () {
        this.businessPasswordWarning = false;
    };
    LoginComponent.prototype.hideIncorrectUserWarning = function () {
        this.incorrectUserWarning = false;
    };
    LoginComponent.prototype.hideIncorrectBusinessWarning = function () {
        this.incorrectBusinessWarning = false;
    };
    LoginComponent.prototype.hideResetUserEmailWarning = function () {
        this.resetUserEmailWarning = false;
    };
    LoginComponent.prototype.hideResetBusinessEmailWarning = function () {
        this.resetBusinessEmailWarning = false;
    };
    LoginComponent.prototype.hideResetSuccessWarning = function () {
        this.resetSuccessWarning = false;
    };
    LoginComponent.prototype.hideResendFailureWarning = function () {
        this.resendFailureWarning = false;
    };
    LoginComponent.prototype.hideResendSuccessWarning = function () {
        this.resendSuccessWarning = false;
    };
    LoginComponent.prototype.hideResendEmailWarning = function () {
        this.resendEmailWarning = false;
    };
    LoginComponent.prototype.onUserLoginCancel = function () {
        this.username = null;
        this.userPassword = null;
        this.userEmail = null;
        this.userUsernameWarning = false;
        this.userPasswordWarning = false;
        this.incorrectUserWarning = false;
        this.resetUserEmailWarning = false;
        this.resetFailureWarning = false;
        this.resetSuccessWarning = false;
        this.loggedin = false;
    };
    LoginComponent.prototype.onBusinessLoginCancel = function () {
        this.businessEmail = null;
        this.businessPassword = null;
        this.businessEmailWarning = false;
        this.businessPasswordWarning = false;
        this.resetBusinessEmailWarning = false;
        this.incorrectBusinessWarning = false;
        this.resetFailureWarning = false;
        this.resetSuccessWarning = false;
        this.loggedin = false;
    };
    LoginComponent.prototype.onUserForgetPassCancel = function () {
        this.username = null;
        this.userPassword = null;
        this.userEmail = null;
        this.userUsernameWarning = false;
        this.userPasswordWarning = false;
        this.incorrectUserWarning = false;
        this.resetUserEmailWarning = false;
        this.resetSuccessWarning = false;
        this.resetFailureWarning = false;
    };
    LoginComponent.prototype.onBusinessForgetPassCancel = function () {
        this.businessEmail = null;
        this.businessPassword = null;
        this.businessEmailWarning = false;
        this.businessPasswordWarning = false;
        this.incorrectBusinessWarning = false;
        this.resetBusinessEmailWarning = false;
        this.resetSuccessWarning = false;
        this.resetFailureWarning = false;
    };
    LoginComponent.prototype.onResendCancel = function () {
        this.userEmail = null;
        this.username = null;
        this.userPassword = null;
        this.businessEmail = null;
        this.businessPassword = null;
        this.userUsernameWarning = false;
        this.userPasswordWarning = false;
        this.incorrectUserWarning = false;
        this.businessEmailWarning = false;
        this.businessPasswordWarning = false;
        this.incorrectBusinessWarning = false;
        this.resendEmailWarning = false;
        this.resendSuccessWarning = false;
        this.resendFailureWarning = false;
    };
    LoginComponent.prototype.keyDownUserLogin = function (event) {
        if (event.keyCode == 13) {
            this.onUserLogin();
        }
    };
    LoginComponent.prototype.keyDownForgetUser = function (event) {
        if (event.keyCode == 13) {
            this.onUserForgetPass();
        }
    };
    LoginComponent.prototype.keyDownBusinessLogin = function (event) {
        if (event.keyCode == 13) {
            this.onBusinessLogin();
        }
    };
    LoginComponent.prototype.keyDownForgetBusiness = function (event) {
        if (event.keyCode == 13) {
            this.onBusinessForgetPass();
        }
    };
    LoginComponent.prototype.keyDownResend = function (event) {
        if (event.keyCode == 13) {
            this.onResendEmail();
        }
    };
    return LoginComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "loginClicked", void 0);
LoginComponent = __decorate([
    Component({
        selector: 'app-signin',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [LoginService,
        Router,
        Http,
        AppService])
], LoginComponent);
export { LoginComponent };
