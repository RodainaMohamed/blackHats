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
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search.service';
var SearchResultComponent = (function () {
    function SearchResultComponent(searchService, route, router) {
        this.searchService = searchService;
        this.route = route;
        this.router = router;
        this.businesses = [];
        this.sliced = [];
        this.pagingIndex = [];
        this.pageNumber = 1;
    }
    SearchResultComponent.prototype.ngOnInit = function () {
        this.getQueryParams();
        this.search();
        $("#back-to-top").click();
    };
    SearchResultComponent.prototype.search = function () {
        var _this = this;
        this.searchService.getBusinesses(this.searchQuery).subscribe(function (businesses) {
            _this.businesses = businesses;
            _this.pagingIndex = new Array(Math.ceil(_this.businesses.length / 16));
            _this.updatePage(1);
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
    SearchResultComponent.prototype.getQueryParams = function () {
        var _this = this;
        this.route
            .queryParams
            .subscribe(function (params) {
            _this.result = params['result'];
            _this.location = params['location'];
            _this.category = params['category'];
            _this.searchQuery = "result=" + _this.result;
            if (!_this.result) {
                _this.searchQuery = "location=" + _this.location + "&category=" + _this.category;
            }
            _this.searchQuery = _this.searchQuery + "&sort=" + _this.sort;
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
    SearchResultComponent.prototype.previous = function () {
        if (!(this.pageNumber < 1)) {
            this.updatePage(this.pageNumber - 1);
        }
    };
    SearchResultComponent.prototype.next = function () {
        if (this.pageNumber < this.pagingIndex.length) {
            this.updatePage(this.pageNumber + 1);
        }
    };
    SearchResultComponent.prototype.updatePage = function (page) {
        $("#page" + this.pageNumber).removeClass("active");
        this.sliced = this.businesses.slice(page - 1, this.pageNumber * 16 + 15);
        this.pageNumber = page;
        $("#page" + this.pageNumber).addClass("active");
    };
    SearchResultComponent.prototype.updateSortQuery = function (sortValue) {
        this.sort = sortValue;
        this.getQueryParams();
        this.search();
    };
    SearchResultComponent.prototype.ngAfterViewChecked = function () {
        $("#page" + this.pageNumber).addClass("active");
    };
    return SearchResultComponent;
}());
SearchResultComponent = __decorate([
    Component({
        selector: 'homepage-search-result',
        templateUrl: './result.component.html'
    }),
    __metadata("design:paramtypes", [SearchService, ActivatedRoute, Router])
], SearchResultComponent);
export { SearchResultComponent };
