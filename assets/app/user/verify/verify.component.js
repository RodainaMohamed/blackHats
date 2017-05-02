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
import { VerifyService } from './verify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var VerifyComponent = (function () {
    function VerifyComponent(verifyService, router, http, route) {
        this.verifyService = verifyService;
        this.router = router;
        this.http = http;
        this.route = route;
    }
    VerifyComponent.prototype.ngOnInit = function () {
        var _this = this;
        $("#back-to-top").click();
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
            _this.verifyService.verifyToken(_this.token).subscribe(function (data) {
                if (data.msg === "Token is valid.") {
                    _this.userId = data.data.id;
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
        });
    };
    VerifyComponent.prototype.onVerifyUser = function () {
        var _this = this;
        this.verifyService.confirmId(this.userId).subscribe(function (data) {
            bootbox.alert("You verified your account successfully.", function () {
                _this.router.navigateByUrl("/homepage");
            });
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
    return VerifyComponent;
}());
VerifyComponent = __decorate([
    Component({
        selector: 'app-verify',
        templateUrl: './verify.component.html'
    }),
    __metadata("design:paramtypes", [VerifyService,
        Router,
        Http,
        ActivatedRoute])
], VerifyComponent);
export { VerifyComponent };
