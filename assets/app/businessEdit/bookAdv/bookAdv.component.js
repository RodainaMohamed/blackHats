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
import { BookAdvService } from "./bookAdv.service";
import { AppService } from "../../app.service";
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import * as moment from 'moment/moment';
import 'rxjs/add/operator/map';
var BookAdvComponent = (function () {
    function BookAdvComponent(bookAdvService, router, http, appService) {
        this.bookAdvService = bookAdvService;
        this.router = router;
        this.http = http;
        this.appService = appService;
        this.availableSlots = [];
        this.noOfDays = [];
        this.uploader = new FileUploader({ url: 'http://localhost:8080/api/advertisement/addAdvPhoto', itemAlias: "myfile" });
        this.startTime = new Date();
        this.endTime = new Date();
        this.startTimeValue = new Date();
        this.endTimeValue = new Date();
        this.advNoOfDaysWarning = false;
        this.advImgWarning = false;
        this.successfulBooking = false;
    }
    ;
    BookAdvComponent.prototype.ngOnInit = function () {
        this.advPicture = "http://localhost:8080/api/image/businessAds/defaultAPic.jpg";
        this.showAdvSlots();
    };
    BookAdvComponent.prototype.showAdvSlots = function () {
        var _this = this;
        this.bookAdvService.getAdvSlots().subscribe(function (data) {
            _this.advertisements = data.data;
            var i = 0;
            for (var _i = 0, _a = _this.advertisements; _i < _a.length; _i++) {
                var advertisement = _a[_i];
                _this.getFreeSlot(data.data[i]._id, i);
                i++;
            }
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
    BookAdvComponent.prototype.getFreeSlot = function (index, i) {
        var _this = this;
        this.bookAdvService.getFreeSlot(index).subscribe(function (data) {
            _this.availableSlots[i] = data.data;
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
    BookAdvComponent.prototype.uploadAdvPicture = function () {
        var _this = this;
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            switch (status) {
                case 404:
                    _this.router.navigateByUrl('/404-error');
                    break;
                case 401:
                    _this.router.navigateByUrl('/notAuthorized-error');
                    break;
                case 200:
                    break;
                default:
                    _this.router.navigateByUrl('/500-error');
                    break;
            }
            _this.advPicture = JSON.parse(response).data;
            _this.path = "http://localhost:8080/api/image/businessAds/";
        };
    };
    BookAdvComponent.prototype.bookAdv = function (advId, index) {
        var _this = this;
        if (!this.noOfDays || this.noOfDays.length == 0) {
            this.advNoOfDaysWarning = true;
        }
        else {
            this.advNoOfDaysWarning = false;
        }
        if (!this.advPicture || this.advPicture.length == 0 || this.advPicture === "http://localhost:8080/api/image/businessAds/defaultAPic.jpg") {
            this.advImgWarning = true;
        }
        else {
            this.advImgWarning = false;
        }
        if (!this.advImgWarning && !this.advNoOfDaysWarning) {
            this.startTimeValue = new Date(this.availableSlots[index]);
            this.endTimeValue = new Date();
            var end = moment(this.startTimeValue);
            end.add(this.noOfDays[index], 'days');
            this.endTimeValue = end.toDate();
            var handler = window.StripeCheckout.configure({
                key: 'pk_test_9AEHvD0gXViwtKYQDpQcLXlY',
                locale: 'auto',
                currency: 'egp',
                token: function (token) { return _this.gotToken(token, advId, index); }
            });
            handler.open({
                name: 'Book Advertisement',
                description: this.advertisements[index].name,
                amount: this.advertisements[index].price * 100
            });
        }
        else {
            $("#back-to-top").click();
        }
    };
    BookAdvComponent.prototype.gotToken = function (token, advId, index) {
        var _this = this;
        this.appService.charge(token).subscribe(function (res) {
            _this.bookAdvService.bookAdvSlot(_this.startTimeValue, _this.endTimeValue, _this.advPicture, advId).subscribe(function (data) {
                bootbox.alert(data.msg);
                var tempDate = new Date(_this.availableSlots[index]);
                tempDate.setDate(_this.endTimeValue.getDate() + 1);
                _this.availableSlots[index] = tempDate;
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
    };
    BookAdvComponent.prototype.hideAdvImgWarning = function () {
        this.advImgWarning = false;
    };
    BookAdvComponent.prototype.hideNoOfDaysWarning = function () {
        this.advNoOfDaysWarning = false;
    };
    return BookAdvComponent;
}());
BookAdvComponent = __decorate([
    Component({
        selector: 'app-bookAdv',
        templateUrl: './bookAdv.component.html',
        styleUrls: ['./bookAdv.component.css']
    }),
    __metadata("design:paramtypes", [BookAdvService,
        Router,
        Http,
        AppService])
], BookAdvComponent);
export { BookAdvComponent };
