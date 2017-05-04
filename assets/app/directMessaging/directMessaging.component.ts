import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { DirectMessagingService } from './directMessaging.service';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'app-directMessaging',
    templateUrl: './directMessaging.component.html',
    styleUrls: ['./directMessaging.component.css']
})

export class DirectMessagingComponent implements OnInit, AfterViewChecked {
    @ViewChild('chatBox')  myScrollContainer: ElementRef;

     user: String;
     business: String;
     thread: any;
     destID: String;
    message: String;
     threads: [any];
     messages: [any];
     isUser: boolean = true;
     srcID: string;


     currentThread: any = {
        messages: []
    };
     newMessage: String;
     index = 0;
     noThreads = true;

    constructor(
        private appService: AppService,
        private directMessagingService: DirectMessagingService,
        private http: Http,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.appService.getCurrentUser().subscribe(
            (info) => {
                if (info.user) {
                    this.srcID = info.user._id;
                    this.isUser = true;
                }
                else {
                    this.srcID = info.business._id;
                    this.isUser = false;
                }
                this.getThreads();
                        this.scrollToBottom();
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
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    getThreads() {
        this.directMessagingService.getThreads(this.srcID).subscribe(
            (threads) => {
                this.threads = threads.data;
                if (this.threads.length != 0) {
                    this.noThreads = false
                    this.currentThread = this.threads[0];
                }
                else {
                    this.noThreads = true
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
    }

    getMessages(threadID) {
        this.directMessagingService.getMessages(threadID).subscribe(
            (messages) => {
                this.messages = messages.data;
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
    }

    deleteThread(threadID) {
        this.directMessagingService.deleteThread(threadID).subscribe(
            (data) => {
                bootbox.alert(data.msg);
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
            }
        )
    }

    deleteMessage(messageID) {
        this.directMessagingService.deleteMessage(messageID).subscribe(
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
    }

    onClick(i) {
        this.currentThread = this.threads[i];
        this.index = i;
    }

    isThreadActive(id) {
        return {
            active: this.index == id
        }
    }

    onSend() {
        if (this.newMessage && this.newMessage.length != 0) {
            this.directMessagingService.addMessage(this.currentThread._id, this.newMessage).subscribe(
                (data) => {
                    let now = new Date();
                    let message = {
                        content: this.newMessage,
                        byUser: this.isUser,
                        dateCreated: now
                    };
                    this.threads[this.index].messages.push(message);
                    //this.currentThread.messages.push(this.newMessage);
                    this.newMessage = null;
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
                }
            )
        }
    }

    isMessageInvalid(){
        if(this.newMessage)
            return this.newMessage.trim().length == 0; 
        else
            return true;
    }

    clickSend(event){
        event.preventDefault();
        $('#send').click();
    }
}
