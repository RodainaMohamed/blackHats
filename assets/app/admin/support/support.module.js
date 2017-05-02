var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SupportService } from './support.service';
import { SupportComponent } from './support.component';
var SupportModule = (function () {
    function SupportModule() {
    }
    return SupportModule;
}());
SupportModule = __decorate([
    NgModule({
        declarations: [
            SupportComponent
        ],
        imports: [
            CommonModule,
            SharedModule
        ],
        providers: [SupportService]
    })
], SupportModule);
export { SupportModule };
;
