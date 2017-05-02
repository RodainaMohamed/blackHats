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
import { BusinessRegisterService } from './businessRegister.service';
import { Business } from '../business.model';
var BusinessRegisterComponent = (function () {
    function BusinessRegisterComponent(businessRegisterService) {
        this.businessRegisterService = businessRegisterService;
        this.success = false;
        this.failure = false;
        //warnings
        this.nameRequired = false;
        this.passwordRequired = false;
        this.passwordLength = false;
        this.descriptionRequired = false;
        this.identicalPasswords = false;
        this.emailRequired = false;
    }
    BusinessRegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        //Construct a new business of business.model.ts with the values entered on pressing submit
        var business = new Business(this.name, this.password, this.confirmPassword, this.email, this.description);
        this.nameRequired = false;
        this.passwordRequired = false;
        this.passwordLength = false;
        this.descriptionRequired = false;
        this.identicalPasswords = false;
        this.emailRequired = false;
        this.failure = false;
        /*
        Calling the signUp function from the service to handle the Business Application operation
        Gets back data and error messages then handling them by bootstrap alerts
        Setting the success and failure booleans to check on them in the html file
        */
        if (!this.name || this.name.length == 0) {
            this.nameRequired = true;
            setTimeout(function () {
                _this.nameRequired = false;
            }, 5000);
        }
        else {
            this.nameRequired = false;
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
        if (!this.description || this.description.length == 0) {
            this.descriptionRequired = true;
            setTimeout(function () {
                _this.descriptionRequired = false;
            }, 5000);
        }
        else {
            this.descriptionRequired = false;
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
        if (!this.email || this.email.length == 0) {
            this.emailRequired = true;
            setTimeout(function () {
                _this.emailRequired = false;
            }, 5000);
        }
        else {
            this.emailRequired = false;
        }
        if (!this.emailRequired && !this.identicalPasswords && !this.descriptionRequired && !this.passwordLength && !this.passwordRequired && !this.nameRequired) {
            this.businessRegisterService.signUp(business)
                .subscribe(function (data) {
                _this.success = true;
                setTimeout(function () {
                    _this.success = false;
                    $("#businessRegisterClose").click();
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
    };
    ;
    BusinessRegisterComponent.prototype.hideNameWarning = function () {
        this.nameRequired = false;
    };
    BusinessRegisterComponent.prototype.hidePasswordWarning = function () {
        this.passwordRequired = false;
    };
    BusinessRegisterComponent.prototype.hideLengthWarning = function () {
        this.passwordLength = false;
    };
    BusinessRegisterComponent.prototype.hideDescriptionWarning = function () {
        this.descriptionRequired = false;
    };
    BusinessRegisterComponent.prototype.hideIdenticalPasswords = function () {
        this.identicalPasswords = false;
    };
    BusinessRegisterComponent.prototype.hideEmailRequired = function () {
        this.emailRequired = false;
    };
    BusinessRegisterComponent.prototype.onClose = function () {
        this.name = "";
        this.password = "";
        this.confirmPassword = "";
        this.email = "";
        this.description = "";
        this.nameRequired = false;
        this.passwordRequired = false;
        this.passwordLength = false;
        this.descriptionRequired = false;
        this.identicalPasswords = false;
        this.emailRequired = false;
    };
    return BusinessRegisterComponent;
}());
BusinessRegisterComponent = __decorate([
    Component({
        selector: 'business-register',
        templateUrl: './businessRegister.component.html'
    }),
    __metadata("design:paramtypes", [BusinessRegisterService])
], BusinessRegisterComponent);
export { BusinessRegisterComponent };
