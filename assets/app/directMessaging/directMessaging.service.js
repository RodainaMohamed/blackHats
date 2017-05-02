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
var DirectMessagingService = (function () {
    function DirectMessagingService(http) {
        this.http = http;
    }
    DirectMessagingService.prototype.existingThread = function (user, business) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            userID: user,
            businessID: business
        };
        return this.http.post('http://localhost:8080/api/thread/findExistingThread', body, { headers: headers }).map(function (res) { return res.json(); });
    };
    DirectMessagingService.prototype.newThread = function (destID, message) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            message: message
        };
        return this.http.post('http://localhost:8080/api/thread/add/' + destID, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    DirectMessagingService.prototype.addMessage = function (threadID, message) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            content: message
        };
        return this.http.post('http://localhost:8080/api/thread/addMessage/' + threadID, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    DirectMessagingService.prototype.getThreads = function (srcID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/thread/getThreads/' + srcID, { headers: headers }).map(function (res) { return res.json(); });
    };
    DirectMessagingService.prototype.deleteThread = function (threadID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/thread/deleteThread/' + threadID, { headers: headers }).map(function (res) { return res.json(); });
    };
    DirectMessagingService.prototype.getMessages = function (threadID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:8080/api/thread/getMessages/' + threadID, { headers: headers }).map(function (res) { return res.json(); });
    };
    DirectMessagingService.prototype.deleteMessage = function (messageID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/api/thread/deleteMessage/' + messageID, { headers: headers }).map(function (res) { return res.json(); });
    };
    return DirectMessagingService;
}());
DirectMessagingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DirectMessagingService);
export { DirectMessagingService };
