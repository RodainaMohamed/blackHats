var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { EditUserProfileService } from "./editProfile.service";
import { AppService } from '../../app.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var EditUserProfileComponent = (function () {
    function EditUserProfileComponent(activatedRoute, appService, editProfileService, router, http) {
        this.activatedRoute = activatedRoute;
        this.appService = appService;
        this.editProfileService = editProfileService;
        this.router = router;
        this.http = http;
        this.uploader = new FileUploader({ url: 'http://localhost:8080/api/user/profile/uploadProfilePicture', itemAlias: "myfile" });
        this.pictureChanged = new EventEmitter();
        this.path = "";
        this.userId = "";
    }
    EditUserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.userId = params['userId'];
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
        this.initialise();
    };
    EditUserProfileComponent.prototype.initialise = function () {
        var _this = this;
        this.editProfileService.getOneUser(this.userId).subscribe(function (data) {
            _this.firstName = data.data.firstName;
            _this.lastName = data.data.lastName;
            _this.birthDate = data.data.birthDate;
            if (data.data.profilePicture != null) {
                _this.path = "http://localhost:8080/api/image/profilePictures/";
                _this.profilePicture = data.data.profilePicture;
            }
            else {
                _this.path = "";
                _this.profilePicture = "http://localhost:8080/api/image/profilePictures/defaultpp.jpg";
            }
            _this.uploader = new FileUploader({ url: 'http://localhost:8080/api/user/profile/uploadProfilePicture', itemAlias: "myfile" });
            _this.uploader.onCompleteItem = function (item, response, status, headers) {
                switch (status) {
                    case 404:
                        _this.router.navigateByUrl('/404-error');
                        break;
                    case 401:
                        _this.router.navigateByUrl('/notAuthorized-error');
                        break;
                    case 200:
                        break;
                    case 201:
                        break;
                    default:
                        _this.router.navigateByUrl('/500-error');
                        break;
                }
                _this.initialise();
                var res = JSON.parse(response);
                _this.pictureChanged.emit(res.data.imagePath);
                _this.profilePicture = res.data.imagePath;
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
    };
    EditUserProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        this.editProfileService.editUserProfile(this.firstName, this.lastName, this.birthDate).subscribe(function (data) {
            bootbox.alert("Profile Updated.");
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
    };
    EditUserProfileComponent.prototype.onUpload = function () {
        this.uploader.uploadAll();
    };
    EditUserProfileComponent.prototype.deleteAccount = function () {
        var _this = this;
        bootbox.confirm({
            title: "Delete Account",
            message: "Are you sure you want to delete your account? This cannot be undone!",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.editProfileService.deleteAccount().subscribe(function (data) {
                        _this.router.navigateByUrl('/homepage');
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
            }
        });
    };
    EditUserProfileComponent.prototype.cancel = function () {
        this.initialise();
    };
    return EditUserProfileComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], EditUserProfileComponent.prototype, "pictureChanged", void 0);
EditUserProfileComponent = __decorate([
    Component({
        selector: 'app-editUserProfile',
        templateUrl: './editProfile.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        AppService,
        EditUserProfileService,
        Router,
        Http])
], EditUserProfileComponent);
export { EditUserProfileComponent };
