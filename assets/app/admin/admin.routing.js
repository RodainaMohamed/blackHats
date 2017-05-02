import { SupportComponent } from './support/support.component';
import { AdsComponent } from './ads/ads.component';
import { USER_ROUTES } from './user/user.routing';
import { BUSINESS_ROUTES } from './business/business.routing';
export var ADMIN_ROUTES = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', children: USER_ROUTES },
    { path: 'business', children: BUSINESS_ROUTES },
    { path: 'support', component: SupportComponent },
    { path: 'advertisement', component: AdsComponent }
];
