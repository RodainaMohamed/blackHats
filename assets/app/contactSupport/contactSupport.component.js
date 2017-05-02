var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ContactSupportService } from './contactSupport.service';
var ContactSupportComponent = (function () {
    function ContactSupportComponent(contactService, router) {
        this.contactService = contactService;
        this.router = router;
    }
    ContactSupportComponent.prototype.ngOnInit = function () {
        $("#back-to-top").click();
    };
    ContactSupportComponent.prototype.submitForm = function (title, contactEmail, contactPhoneNumber, accountType, registeredEmail, description) {
        var _this = this;
        this.contactService.submitRequest(title, contactEmail, contactPhoneNumber, accountType, registeredEmail, description).subscribe(function (data) {
            bootbox.alert(data.msg, function () {
                location.reload();
            });
        }, function (err) {
            if (err.msg)
                bootbox.alert(err.msg);
            else {
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
            }
        });
    };
    ContactSupportComponent.prototype.preventDefault = function (event) {
        event.preventDefault();
    };
    return ContactSupportComponent;
}());
ContactSupportComponent = __decorate([
    Component({
        selector: 'my-app-contactSupport',
        templateUrl: './contactSupport.component.html'
    }),
    __metadata("design:paramtypes", [ContactSupportService, Router])
], ContactSupportComponent);
export { ContactSupportComponent };
