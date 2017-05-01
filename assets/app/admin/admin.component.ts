import { Component } from '@angular/core';

@Component({
    selector: 'my-app-admin',
    template: `<div id="introLoader" class="introLoading"> <router-outlet></router-outlet>`,
    styleUrls: ['./admin.component.css']
})

export class AdminComponent {
    
}
