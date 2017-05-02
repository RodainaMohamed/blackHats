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
import { DirectMessagingService } from './directMessaging.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
var DirectMessagingComponent = (function () {
    function DirectMessagingComponent(appService, directMessagingService, http, router, route) {
        this.appService = appService;
        this.directMessagingService = directMessagingService;
        this.http = http;
        this.router = router;
        this.route = route;
        this.isUser = true;
        this.currentThread = {
            messages: []
        };
        this.index = 0;
        this.noThreads = true;
    }
    DirectMessagingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (info) {
            if (info.user) {
                _this.srcID = info.user._id;
                _this.isUser = true;
            }
            else {
                _this.srcID = info.business._id;
                _this.isUser = false;
            }
            _this.getThreads();
        });
    };
    DirectMessagingComponent.prototype.sendMessage = function () {
        var _this = this;
        this.appService.getCurrentUser().subscribe(function (user) {
            if (_this.user.constructor.name === "User") {
                _this.user = user.data._id;
            }
            else {
                _this.business = user.data._id;
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
        this.route.params.subscribe(function (params) {
            if (!_this.user) {
                _this.user = params['userId'];
                _this.destID = params['userId'];
            }
            if (!_this.business) {
                _this.business = params['businessId'];
                _this.destID = params['businessId'];
            }
            _this.directMessagingService.existingThread(_this.user, _this.business).subscribe(function (thread) {
                _this.thread = thread.data;
                _this.directMessagingService.addMessage(_this.thread._id, _this.message).subscribe(function (data) { }, function (err) {
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
            }, function (err) {
                _this.directMessagingService.newThread(_this.destID, _this.message).subscribe(function (thread) {
                    _this.thread = thread.data;
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
        });
    };
    DirectMessagingComponent.prototype.getThreads = function () {
        var _this = this;
        this.directMessagingService.getThreads(this.srcID).subscribe(function (threads) {
            _this.threads = threads.data;
            if (_this.threads.length != 0) {
                _this.noThreads = false;
                _this.currentThread = _this.threads[0];
            }
            else {
                _this.noThreads = true;
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
    DirectMessagingComponent.prototype.getMessages = function (threadID) {
        var _this = this;
        this.directMessagingService.getMessages(threadID).subscribe(function (messages) {
            _this.messages = messages.data;
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
    DirectMessagingComponent.prototype.deleteThread = function (threadID) {
        var _this = this;
        this.directMessagingService.deleteThread(threadID).subscribe(function (data) { }, function (err) {
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
    DirectMessagingComponent.prototype.deleteMessage = function (messageID) {
        var _this = this;
        this.directMessagingService.deleteMessage(messageID).subscribe(function (data) { }, function (err) {
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
    DirectMessagingComponent.prototype.onClick = function (i) {
        this.currentThread = this.threads[i];
        this.index = i;
    };
    DirectMessagingComponent.prototype.onSend = function () {
        var _this = this;
        if (this.newMessage && this.newMessage.length != 0) {
            this.directMessagingService.addMessage(this.currentThread._id, this.newMessage).subscribe(function (data) {
                var now = new Date();
                var message = {
                    content: _this.newMessage,
                    byUser: _this.isUser,
                    dateCreated: now
                };
                _this.threads[_this.index].messages.push(message);
                //this.currentThread.messages.push(this.newMessage);
                _this.newMessage = null;
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
    };
    return DirectMessagingComponent;
}());
DirectMessagingComponent = __decorate([
    Component({
        selector: 'app-directMessaging',
        templateUrl: './directMessaging.component.html',
        styleUrls: ['./directMessaging.component.css']
    }),
    __metadata("design:paramtypes", [AppService,
        DirectMessagingService,
        Http,
        Router,
        ActivatedRoute])
], DirectMessagingComponent);
export { DirectMessagingComponent };
