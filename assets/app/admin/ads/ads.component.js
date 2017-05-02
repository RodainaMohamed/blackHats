var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AdsService } from './ads.service';
import { Component } from '@angular/core';
var AdsComponent = (function () {
    function AdsComponent(adsService) {
        this.adsService = adsService;
        this.slots = [];
        this.loading = false;
    }
    AdsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adsService.getSlots().subscribe(function (slots) {
            _this.slots = slots;
        }, function (err) {
            bootbox.alert(err.msg, function () {
                location.reload();
            });
            $('.modal-backdrop').css('z-index', '-1');
        });
    };
    AdsComponent.prototype.isLoading = function () {
        return this.loading;
    };
    AdsComponent.prototype.deleteSlot = function (slotId) {
        var _this = this;
        bootbox.confirm({
            title: "Delete Slot?",
            message: "Are you sure you want to delete this slot? This cannot be undone.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Delete'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.adsService.deleteSlot(slotId).subscribe(function (msg) {
                        bootbox.alert(msg, function () {
                            location.reload();
                        });
                        $('.modal-backdrop').css('z-index', '-1');
                    }, function (err) {
                        bootbox.alert(err.msg, function () {
                            location.reload();
                        });
                        $('.modal-backdrop').css('z-index', '-1');
                    });
                }
            }
        });
        $('.modal-backdrop').css('z-index', '-1');
    };
    AdsComponent.prototype.preventDefault = function (event) {
        event.preventDefault();
    };
    AdsComponent.prototype.addSlot = function () {
        var _this = this;
        bootbox.confirm({
            title: "Add Slot?",
            message: "Are you sure you want to add this slot?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Add'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.loading = true;
                    _this.adsService.addSlot(_this.name, _this.price, _this.length, _this.width).subscribe(function (msg) {
                        bootbox.alert(msg, function () {
                            location.reload();
                        });
                        $('.modal-backdrop').css('z-index', '-1');
                    }, function (err) {
                        bootbox.alert(err.msg, function () {
                            location.reload();
                        });
                        $('.modal-backdrop').css('z-index', '-1');
                    });
                }
            }
        });
        $('.modal-backdrop').css('z-index', '-1');
    };
    return AdsComponent;
}());
AdsComponent = __decorate([
    Component({
        selector: 'app-admin-ads',
        templateUrl: './ads.component.html'
    }),
    __metadata("design:paramtypes", [AdsService])
], AdsComponent);
export { AdsComponent };
;
