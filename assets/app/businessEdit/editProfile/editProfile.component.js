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
import { FileUploader } from 'ng2-file-upload';
import { EditProfileService } from "./editProfile.service";
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from '../../app.service';
var EditProfileComponent = (function () {
    function EditProfileComponent(editProfileService, router, appService, http) {
        this.editProfileService = editProfileService;
        this.router = router;
        this.appService = appService;
        this.http = http;
        this.uploader = new FileUploader({ url: 'http://localhost:8080/api/business/addLogo', itemAlias: "myfile" });
        this.depositFlag = false;
        this.extraNumber = "";
        this.extraTag = "";
        this.extraDay = "";
        this.path = "";
        this.lat = 30.044281;
        this.lng = 31.340002;
        this.address = "";
        this.city = "";
        //warnings
        this.descriptionRequired = false;
        this.nameRequired = false;
        this.depositRequired = false;
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        this.initialise();
    };
    EditProfileComponent.prototype.initialise = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (data) {
            if (data.success && data.business) {
                _this.businessId = data.business._id;
                _this.editProfileService.getBusinessProfile(_this.businessId).subscribe(function (data) {
                    _this.name = data.data.name;
                    if (data.data.workingHours != null) {
                        _this.workingFrom = data.data.workingHours.from;
                        _this.workingTo = data.data.workingHours.to;
                    }
                    _this.category = data.data.category;
                    _this.description = data.data.description;
                    _this.paymentRequired = data.data.paymentRequired;
                    if (data.data.paymentRequired == 2) {
                        _this.depositFlag = true;
                    }
                    else {
                        _this.depositFlag = false;
                    }
                    _this.deposit = data.data.deposit;
                    _this.phoneNumbers = data.data.phoneNumbers;
                    _this.tags = data.data.tags;
                    _this.workingDays = data.data.workingDays;
                    if (data.data.location != null) {
                        _this.lng = data.data.location.coordinates[0];
                        _this.lat = data.data.location.coordinates[1];
                        _this.address = data.data.location.address;
                        _this.city = data.data.location.city;
                    }
                    if (data.data.logo != null) {
                        _this.path = "http://localhost:8080/api/image/businessLogos/";
                        _this.logo = data.data.logo;
                    }
                    else {
                        _this.path = "";
                        _this.logo = "http://localhost:8080/api/image/businessLogos/defaultBLogo.jpg";
                    }
                    _this.uploader = new FileUploader({ url: 'http://localhost:8080/api/business/addLogo', itemAlias: "myfile" });
                    _this.uploader.onCompleteItem = function (item, response, headers) {
                        _this.initialise();
                    };
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
            }
        });
    };
    EditProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        if (!this.name || this.name.trim().length == 0) {
            this.nameRequired = true;
        }
        else {
            this.nameRequired = false;
        }
        if (!this.description || this.description.trim().length == 0) {
            this.descriptionRequired = true;
        }
        else {
            this.descriptionRequired = false;
        }
        if (this.depositFlag && (!this.deposit || this.deposit == 0)) {
            this.depositRequired = true;
        }
        else {
            this.depositRequired = false;
        }
        if (!this.descriptionRequired && !this.nameRequired && !this.depositRequired) {
            var workingHours = {
                from: this.workingFrom,
                to: this.workingTo
            };
            var location_1 = {
                address: this.address,
                city: this.city,
                coordinates: [this.lng, this.lat]
            };
            this.editProfileService.editBusinessProfile(this.name, workingHours, this.workingDays, this.category, location_1, this.description, this.phoneNumbers, this.tags, this.paymentRequired, this.deposit).subscribe(function (data) {
                bootbox.alert("Profile updated.");
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
        }
        else {
            $("#back-to-top").click();
        }
    };
    EditProfileComponent.prototype.cancel = function () {
        this.initialise();
    };
    EditProfileComponent.prototype.showDeposit = function (value) {
        if (value == 2) {
            this.depositFlag = true;
        }
        else {
            this.depositFlag = false;
        }
    };
    EditProfileComponent.prototype.addPhoneNumber = function () {
        if (this.extraNumber != "") {
            this.phoneNumbers.push(this.extraNumber);
            this.extraNumber = "";
        }
    };
    EditProfileComponent.prototype.removePhoneNumber = function (index) {
        this.phoneNumbers.splice(index, 1);
    };
    EditProfileComponent.prototype.addTag = function () {
        if (this.extraTag != "") {
            this.tags.push(this.extraTag);
            this.extraTag = "";
        }
    };
    EditProfileComponent.prototype.removeTag = function (index) {
        this.tags.splice(index, 1);
    };
    EditProfileComponent.prototype.addWorkingDay = function () {
        if (this.extraDay != "") {
            this.workingDays.push(this.extraDay);
            this.extraDay = "";
        }
    };
    EditProfileComponent.prototype.removeWorkingDay = function (index) {
        this.workingDays.splice(index, 1);
    };
    EditProfileComponent.prototype.onUpload = function () {
        this.uploader.uploadAll();
    };
    EditProfileComponent.prototype.markerDragEnd = function ($event) {
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    };
    EditProfileComponent.prototype.mapClicked = function ($event) {
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    };
    EditProfileComponent.prototype.hideDescriptionWarning = function () {
        this.descriptionRequired = false;
    };
    EditProfileComponent.prototype.hideNameWarning = function () {
        this.nameRequired = false;
    };
    EditProfileComponent.prototype.hideDepositWarning = function () {
        this.depositRequired = false;
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    Component({
        selector: 'app-editProfile',
        templateUrl: './editProfile.component.html',
        styleUrls: ['./editProfile.component.css']
    }),
    __metadata("design:paramtypes", [EditProfileService,
        Router,
        AppService,
        Http])
], EditProfileComponent);
export { EditProfileComponent };
