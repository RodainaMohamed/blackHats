import { Component, OnInit, NgModule  } from '@angular/core';
import { DirectMessagingService } from './directMessaging.service';
import {Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'app-directMessaging',
    templateUrl: './directMessaging.component.html'
})

export class DirectMessagingComponent implements OnInit {
    private user: String;
    private business: String;
    private thread: Object;
    private destID: String;
    message: String;


    constructor(
        private appService: AppService,
        private directMessagingService: DirectMessagingService,
        private http: Http,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() { }

    sendMessage() {

        this.appService.getCurrentUser().subscribe(
            (user) => {
                if (this.user.constructor.name === "User") {
                    this.user = user.data._id;
                }
                else {
                    this.business = user.data._id;
                }
            },
            (err) => {
                switch (err.status) {
                    case 404:
                        this.router.navigateByUrl('/404-error');
                        break;
                    case 401:
                        this.router.navigateByUrl('/notAuthorized-error');
                        break;
                    default:
                        this.router.navigateByUrl('/500-error');
                        break;
                }
            });

        this.route.params.subscribe(
            (params) => {
                if (!this.user) {
                    this.user = params['userId'];
                    this.destID = params['userId'];
                }
                if (!this.business) {
                    this.business = params['businessId'];
                    this.destID = params['businessId'];
                }
                this.directMessagingService.existingThread(this.user, this.business).subscribe(
                    (thread) => {
                        this.thread = thread.data;
                        this.directMessagingService.addMessage(this.thread._id, this.message).subscribe(
                            (data) => { },
                            (err) => {
                                switch (err.status) {
                                    case 404:
                                        this.router.navigateByUrl('/404-error');
                                        break;
                                    case 401:
                                        this.router.navigateByUrl('/notAuthorized-error');
                                        break;
                                    default:
                                        this.router.navigateByUrl('/500-error');
                                        break;
                                }
                            }
                        )
                    },
                    (err) => {
                        this.directMessagingService.newThread(this.destID, this.message).subscribe(
                            (thread) => {
                                this.thread = thread.data;
                            },
                            (err) => {
                                switch (err.status) {
                                    case 404:
                                        this.router.navigateByUrl('/404-error');
                                        break;
                                    case 401:
                                        this.router.navigateByUrl('/notAuthorized-error');
                                        break;
                                    default:
                                        this.router.navigateByUrl('/500-error');
                                        break;
                                }
                            });
                    });
            });
    }
}
