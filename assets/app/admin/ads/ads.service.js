var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AdSlot } from './ads.model';
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
var AdsService = (function () {
    function AdsService(http) {
        this.http = http;
        this.apiPath = "http://localhost:8080/api/";
    }
    AdsService.prototype.getSlots = function () {
        return this.http.get(this.apiPath + 'advertisement/getAdvSlots')
            .map(function (response) {
            var slots = response.json().data;
            var transformedSlots = [];
            for (var _i = 0, slots_1 = slots; _i < slots_1.length; _i++) {
                var slot = slots_1[_i];
                transformedSlots.push(new AdSlot(slot._id, slot.name, slot.price, slot.length, slot.width));
            }
            return transformedSlots;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    AdsService.prototype.addSlot = function (name, price, length, width) {
        var _this = this;
        return this.http.post(this.apiPath + 'admin/advertisement/addAdvSlots', {
            name: name,
            price: price,
            length: length,
            width: width
        })
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    AdsService.prototype.deleteSlot = function (slotId) {
        var _this = this;
        return this.http.delete(this.apiPath + 'admin/advertisement/deleteAdvSlot/' + slotId)
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    return AdsService;
}());
AdsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AdsService);
export { AdsService };
