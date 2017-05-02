import { VerifyComponent } from './verify.component';
import { ReviewComponent } from './review.component';
export var BUSINESS_ROUTES = [
    { path: '', redirectTo: 'review', pathMatch: 'full' },
    { path: 'review', component: ReviewComponent },
    { path: 'verify', component: VerifyComponent }
];
