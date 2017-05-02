import { UnAssignAdminComponent } from './unAssignAdmin.component';
import { AssignAdminComponent } from './assignAdmin.component';
import { ReviewComponent } from './review.component';
export var USER_ROUTES = [
    { path: '', redirectTo: 'review', pathMatch: 'full' },
    { path: 'review', component: ReviewComponent },
    { path: 'assignAdmin', component: AssignAdminComponent },
    { path: 'unAssignAdmin', component: UnAssignAdminComponent }
];
