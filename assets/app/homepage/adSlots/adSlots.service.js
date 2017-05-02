var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AdSlot } from "../adSlots.model";
import { BookingSlot } from "../bookingSlot.model";
var AdSlotsService = (function () {
    function AdSlotsService(http) {
        this.http = http;
        this.adSlots = [];
        this.bookingSlots = [];
    }
    AdSlotsService.prototype.getAdSlots = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/advertisement/getAdvSlots', { headers: headers })
            .map(function (response) {
            var adSlots = response.json().data;
            var transformedAdSlots = [];
            for (var _i = 0, adSlots_1 = adSlots; _i < adSlots_1.length; _i++) {
                var adSlot = adSlots_1[_i];
                transformedAdSlots.push(new AdSlot(adSlot._id, adSlot.name));
            }
            _this.adSlots = transformedAdSlots;
            return transformedAdSlots;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    AdSlotsService.prototype.getBookedSlots = function (advertismentId) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/advertisement/getCurrentBookings/' + advertismentId, { headers: headers })
            .map(function (response) {
            var bookingSlots = response.json().data;
            var transformedBookingSlots = [];
            for (var _i = 0, bookingSlots_1 = bookingSlots; _i < bookingSlots_1.length; _i++) {
                var bookingSlot = bookingSlots_1[_i];
                transformedBookingSlots.push(new BookingSlot(bookingSlot.business, bookingSlot.advSlot, bookingSlot.image));
            }
            _this.bookingSlots = transformedBookingSlots;
            return transformedBookingSlots;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    return AdSlotsService;
}());
AdSlotsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AdSlotsService);
export { AdSlotsService };
