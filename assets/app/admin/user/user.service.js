var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { User } from './user.model';
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.apiPath = "http://localhost:8080/api/";
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.apiPath + 'admin/user/getVerified')
            .map(function (response) {
            var users = response.json().data;
            var transformedUsers = [];
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var user = users_1[_i];
                transformedUsers.push(new User(user._id, user.firstName, user.lastName, user.email, user.username, user.birthDate, user.admin, user.createdAt, true));
            }
            return transformedUsers;
        }).catch(function (error) { return Observable.throw(error.json()); });
    };
    UserService.prototype.getUnverifiedUsers = function () {
        return this.http.get(this.apiPath + 'admin/user/getUnVerified')
            .map(function (response) {
            var users = response.json().data;
            var transformedUsers = [];
            for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
                var user = users_2[_i];
                transformedUsers.push(new User(user._id, user.firstName, user.lastName, user.email, user.username, user.birthDate, user.admin, user.createdAt, false));
            }
            return transformedUsers;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    UserService.prototype.getAdmins = function () {
        return this.http.get(this.apiPath + 'admin/user/getAdmins')
            .map(function (response) {
            var admins = response.json().data;
            var transformedUsers = [];
            for (var _i = 0, admins_1 = admins; _i < admins_1.length; _i++) {
                var admin = admins_1[_i];
                transformedUsers.push(new User(admin._id, admin.firstName, admin.lastName, admin.email, admin.username, admin.birthDate, admin.admin, admin.createdAt, true));
            }
            return transformedUsers;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    UserService.prototype.getNonAdmins = function () {
        return this.http.get(this.apiPath + 'admin/user/getNonAdmins')
            .map(function (response) {
            var nonAdmins = response.json().data;
            var transformedUsers = [];
            for (var _i = 0, nonAdmins_1 = nonAdmins; _i < nonAdmins_1.length; _i++) {
                var nonAdmin = nonAdmins_1[_i];
                transformedUsers.push(new User(nonAdmin._id, nonAdmin.firstName, nonAdmin.lastName, nonAdmin.email, nonAdmin.username, nonAdmin.birthDate, nonAdmin.admin, nonAdmin.createdAt, true));
            }
            return transformedUsers;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    UserService.prototype.deleteUser = function (userId, verified) {
        var _this = this;
        if (verified) {
            return this.http.delete(this.apiPath + 'admin/user/delete/' + userId)
                .map(function (response) {
                _this.alertMsg = response.json().msg;
                return _this.alertMsg;
            })
                .catch(function (error) { return Observable.throw(error.json()); });
        }
        else {
            return this.http.delete(this.apiPath + 'admin/user/deleteTemp/' + userId)
                .map(function (response) {
                _this.alertMsg = response.json().msg;
                return _this.alertMsg;
            })
                .catch(function (error) { return Observable.throw(error.json()); });
        }
    };
    UserService.prototype.assignAdmin = function (userId) {
        var _this = this;
        var body = {
            admin: true
        };
        return this.http.put(this.apiPath + 'admin/makeAdmin/' + userId, body)
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    UserService.prototype.unAssignAdmin = function (userId) {
        var _this = this;
        var body = {
            admin: false
        };
        return this.http.put(this.apiPath + 'admin/removeAdmin/' + userId, body)
            .map(function (response) {
            _this.alertMsg = response.json().msg;
            return _this.alertMsg;
        })
            .catch(function (error) { return Observable.throw(error.json()); });
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserService);
export { UserService };
