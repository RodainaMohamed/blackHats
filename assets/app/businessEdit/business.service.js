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
import { Activity } from './activities/activity.model';
import { Slot } from './activities/slot.model';
import 'rxjs/add/operator/map';
var BusinessService = (function () {
    function BusinessService(http) {
        this.http = http;
    }
    BusinessService.prototype.getCurrentUser = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/currentUser', { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.getAverageRating = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/averageRating/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.getReviews = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/review/' + businessId, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.getActivity = function (activityId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/activity/' + activityId + '/getActivity', { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.getActivities = function (businessId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/activity/' + businessId, { headers: headers })
            .map(function (response) {
            var acts = response.json().data;
            var transformedActs = [];
            for (var _i = 0, acts_1 = acts; _i < acts_1.length; _i++) {
                var act = acts_1[_i];
                var slots = [];
                for (var _a = 0, _b = act.slots; _a < _b.length; _a++) {
                    var slot = _b[_a];
                    slots.push(new Slot(slot.startTime, slot.endTime));
                }
                transformedActs.push(new Activity(act.name, act.price, act.description, act.bookingsPerSlot, act.business, act.photos, slots, act.bookings, act._id));
            }
            return transformedActs;
        });
    };
    BusinessService.prototype.deleteActivity = function (activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/activity/' + activity.id + "/delete", { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.editActivity = function (activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "name": activity.name,
            "price": activity.price,
            "description": activity.description,
            "bookingsPerSlot": activity.bookingsPerSlot
        };
        return this.http.post('http://localhost:8080/api/activity/' + activity.id + "/edit", body, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.deleteSlot = function (slot, activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "startTime": slot.startTime,
            "endTime": slot.endTime
        };
        return this.http.delete('http://localhost:8080/api/activity/' + activity.id + "/deleteSlot", { body: body, headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.addSlot = function (slot, activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "startTime": slot.startTime,
            "endTime": slot.endTime
        };
        return this.http.post('http://localhost:8080/api/activity/' + activity.id + "/addSlot", body, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.deleteActivityPhoto = function (path, activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/activity/' + activity.id + '/deletePhoto/' + path, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.addActivity = function (activity) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(activity);
        return this.http.post('http://localhost:8080/api/activity/add', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.testUserLogin = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "username": "aya",
            "password": "aya"
        };
        return this.http.post('http://localhost:8080/api/user/login', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    BusinessService.prototype.testBusinessLogin = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            "email": "five@gmail.com",
            "password": "pass"
        };
        return this.http.post('http://localhost:8080/api/business/login', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    return BusinessService;
}());
BusinessService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], BusinessService);
export { BusinessService };
