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
import { UserRegisterService } from './register.service';
import { User } from '../user.model';
var RegisterComponent = (function () {
    function RegisterComponent(registerService) {
        this.registerService = registerService;
        this.success = false;
        this.failure = false;
        //warnings
        this.firstNameRequired = false;
        this.lastNameRequired = false;
        this.emailRequired = false;
        this.usernameRequired = false;
        this.passwordRequired = false;
        this.passwordLength = false;
        this.identicalPasswords = false;
    }
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        //Construct a new user of user.model.ts with the values entered on pressing submit
        var user = new User(this.firstName, this.lastName, this.username, this.password, this.confirmPassword, this.email);
        this.firstNameRequired = false;
        this.lastNameRequired = false;
        this.emailRequired = false;
        this.usernameRequired = false;
        this.passwordRequired = false;
        this.passwordLength = false;
        this.identicalPasswords = false;
        this.failure = false;
        if (!this.firstName || this.firstName.length == 0) {
            this.firstNameRequired = true;
            setTimeout(function () {
                _this.firstNameRequired = false;
            }, 5000);
        }
        else {
            this.firstNameRequired = false;
        }
        if (!this.lastName || this.lastName.length == 0) {
            this.lastNameRequired = true;
            setTimeout(function () {
                _this.lastNameRequired = false;
            }, 5000);
        }
        else {
            this.lastNameRequired = false;
        }
        if (!this.email || this.email.length == 0) {
            this.emailRequired = true;
            setTimeout(function () {
                _this.emailRequired = false;
            }, 5000);
        }
        else {
            this.emailRequired = false;
        }
        if (!this.username || this.username.length == 0) {
            this.usernameRequired = true;
            setTimeout(function () {
                _this.usernameRequired = false;
            }, 5000);
        }
        else {
            this.usernameRequired = false;
        }
        if (!this.password || this.password.length == 0) {
            this.passwordRequired = true;
            setTimeout(function () {
                _this.passwordRequired = false;
            }, 5000);
        }
        else {
            this.passwordRequired = false;
        }
        if (!this.password || this.password.length < 8) {
            this.passwordLength = true;
            setTimeout(function () {
                _this.passwordLength = false;
            }, 5000);
        }
        else {
            this.passwordLength = false;
        }
        if (this.password != this.confirmPassword) {
            this.identicalPasswords = true;
            setTimeout(function () {
                _this.identicalPasswords = false;
            }, 5000);
        }
        else {
            this.identicalPasswords = false;
        }
        /*
        Calling the signUp function from the service to handle the register operation
        Gets back data and error messages then handling them by bootstrap alerts
        Setting the success and failure booleans to check on them in the html file
        */
        if (!this.firstNameRequired && !this.lastNameRequired && !this.emailRequired && !this.usernameRequired && !this.passwordRequired && !this.passwordLength && !this.identicalPasswords) {
            this.registerService.signUp(user)
                .subscribe(function (data) {
                _this.success = true;
                // $("#userRegisterModal").scrollTop(0);
                setTimeout(function () {
                    _this.success = false;
                    $("#userRegisterClose").click();
                }, 5000);
            }, function (error) {
                _this.success = false;
                _this.failure = true;
                _this.message = error.error.msg;
                setTimeout(function () {
                    _this.failure = false;
                }, 10000);
            });
        }
        else {
            $("#userRegisterModal").animate({ scrollTop: 0 }, "slow");
        }
    };
    ;
    RegisterComponent.prototype.hideFirstNameWarning = function () {
        this.firstNameRequired = false;
    };
    RegisterComponent.prototype.hideLastNameWarning = function () {
        this.lastNameRequired = false;
    };
    RegisterComponent.prototype.hideEmailWarning = function () {
        this.emailRequired = false;
    };
    RegisterComponent.prototype.hideUsernameWarning = function () {
        this.usernameRequired = false;
    };
    RegisterComponent.prototype.hidePasswordWarning = function () {
        this.passwordRequired = false;
    };
    RegisterComponent.prototype.hideLengthWarning = function () {
        this.passwordLength = false;
    };
    RegisterComponent.prototype.hideIdenticalPasswords = function () {
        this.identicalPasswords = false;
    };
    RegisterComponent.prototype.onClose = function () {
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.email = "";
        this.firstNameRequired = false;
        this.lastNameRequired = false;
        this.emailRequired = false;
        this.usernameRequired = false;
        this.passwordRequired = false;
        this.passwordLength = false;
        this.identicalPasswords = false;
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Component({
        selector: 'user-register',
        templateUrl: './register.component.html'
    }),
    __metadata("design:paramtypes", [UserRegisterService])
], RegisterComponent);
export { RegisterComponent };
