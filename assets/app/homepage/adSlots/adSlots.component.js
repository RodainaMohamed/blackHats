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
import { AdSlotsService } from './adSlots.service';
var AdSlotsComponent = (function () {
    function AdSlotsComponent(router, adSlotsService) {
        this.router = router;
        this.adSlotsService = adSlotsService;
        this.adSlots = [];
        this.bookingSlots = [];
        this.exists = false;
    }
    ;
    AdSlotsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adSlotsService.getAdSlots()
            .subscribe(function (adSlots) {
            _this.adSlots = adSlots;
            var count = 0;
            var _loop_1 = function (i) {
                _this.adSlotsService.getBookedSlots(adSlots[i].adSlotId)
                    .subscribe(function (bookingSlot) {
                    if (bookingSlot.length > 0 && bookingSlot[0].adSlotId == adSlots[i].adSlotId) {
                        _this.bookingSlots.push(bookingSlot[0]);
                        _this.exists = true;
                        count++;
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
            for (var i = 0; i < _this.adSlots.length && count < 3; i++) {
                _loop_1(i);
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
    return AdSlotsComponent;
}());
AdSlotsComponent = __decorate([
    Component({
        selector: 'homepage-adSlots',
        templateUrl: './adSlots.component.html',
        styleUrls: ['adSlots.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        AdSlotsService])
], AdSlotsComponent);
export { AdSlotsComponent };
