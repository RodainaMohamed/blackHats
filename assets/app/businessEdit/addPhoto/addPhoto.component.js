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
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { EditProfileService } from "../editProfile/editProfile.service";
import { AddPhotoService } from "./addPhoto.service";
import { AppService } from '../../app.service';
var AddPhotoComponent = (function () {
    function AddPhotoComponent(editProfileService, addPhotoService, router, appService, http) {
        this.editProfileService = editProfileService;
        this.addPhotoService = addPhotoService;
        this.router = router;
        this.appService = appService;
        this.http = http;
        this.path = "http://localhost:8080/api/";
        this.uploader = new FileUploader({ url: 'http://localhost:8080/api/business/addPhoto', itemAlias: "myfile" });
    }
    AddPhotoComponent.prototype.ngOnInit = function () {
        this.showPhotos();
    };
    AddPhotoComponent.prototype.showPhotos = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (data) {
            if (data.success && data.business) {
                _this.businessId = data.business._id;
                _this.editProfileService.getBusinessProfile(_this.businessId).subscribe(function (data) {
                    _this.photos = data.data.photos;
                    _this.uploader = new FileUploader({ url: 'http://localhost:8080/api/business/addPhoto', itemAlias: "myfile" });
                    _this.uploader.onCompleteItem = function (item, response, status, headers) {
                        switch (status) {
                            case 404:
                                _this.router.navigateByUrl('/404-error');
                                break;
                            case 401:
                                _this.router.navigateByUrl('/notAuthorized-error');
                                break;
                            case 201:
                                break;
                            case 200: break;
                            default:
                                _this.router.navigateByUrl('/500-error');
                                break;
                        }
                        _this.showPhotos();
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
    AddPhotoComponent.prototype.onUpload = function () {
        this.uploader.uploadAll();
    };
    AddPhotoComponent.prototype.deletePhoto = function (index) {
        var _this = this;
        bootbox.confirm({
            title: "Delete Photo",
            message: "Are you sure you want to delete this photo?",
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
                    _this.addPhotoService.deletePhoto(_this.photos[index]).subscribe(function (data) {
                        _this.showPhotos();
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
    return AddPhotoComponent;
}());
AddPhotoComponent = __decorate([
    Component({
        selector: 'app-addPhoto',
        templateUrl: './addPhoto.component.html',
        styleUrls: ['./addPhoto.component.css']
    }),
    __metadata("design:paramtypes", [EditProfileService,
        AddPhotoService,
        Router,
        AppService,
        Http])
], AddPhotoComponent);
export { AddPhotoComponent };
