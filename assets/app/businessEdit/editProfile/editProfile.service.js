var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
var EditProfileService = (function () {
    function EditProfileService(http) {
        this.http = http;
    }
    EditProfileService.prototype.getBusinessProfile = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/business/' + businessId + '/getInfo', { headers: headers }).map(function (res) { return res.json(); });
    };
    EditProfileService.prototype.editBusinessProfile = function (name, wHours, wDays, category, location, description, phoneNumbers, tags, paymentRequired, deposit) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: name,
            description: description,
            tags: tags,
            category: category,
            paymentRequired: paymentRequired,
            phoneNumbers: phoneNumbers,
            workingDays: wDays,
            workingHours: wHours,
            location: location,
            deposit: deposit
        };
        return this.http.put('http://localhost:8080/api/business/editInfo', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return EditProfileService;
}());
EditProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], EditProfileService);
export { EditProfileService };
