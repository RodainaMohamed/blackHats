import { Component, OnInit } from '@angular/core';
import { BusinessPageService } from './businessPage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AppService } from '../app.service';
import { DirectMessagingService } from '../directMessaging/directMessaging.service';



@Component({
    selector: 'app-business-page',
    templateUrl: './businessPage.component.html',
    styleUrls: ['./businessPage.component.css']
})
export class BusinessPageComponent implements OnInit {

    name: String = "";
    logo: String = "";
    address: String = "";
    addressAvailable = false;
    email: String = "";
    phoneNumbers: String[] = [];
    phoneNumbersAvailable = false;
    workingDays: String[] = [];
    workingDaysAvailable = false;
    workingFrom: String = "";
    workingTo: String = "";
    workingHoursAvailable = false;
    description: String = "";
    rating: any = "";
    ratingNumber: Number;
    activities: Object[] = new Array<Object>();
    category: String;
    categoryAvailable = false;
    businessId: String = "";
    path: String = "http://localhost:8080/api/";
    reviews: Object[] = new Array<Object>();
    photos: String[] = [];
    firstPhoto: String = "";
    paymentRequired: Number;
    paymentStatus: String;
    deposit: Number;
    depositAvailable = false;
    loadDone = false;
    ownerLoggedIn = false;
    userLoggedIn = false;
    favorited = false;
    noPhotos = false;
    activitiesAvailable = false;
    reviewsAvailable = false;
    test = 3;
    private user: String;
    private business: String;
    private thread: any;
    private destID: String;
    message: String;
    messageDone: Boolean = false;

    constructor(
        private businessPageService: BusinessPageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: Http,
        private appService: AppService,
        private directMessagingService: DirectMessagingService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.initialize();
        $("#back-to-top").click();
    }

    initialize() {
        this.messageDone = false;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.businessId = params['businessId'];

            this.appService.getCurrentUser().subscribe(info => {
                if (info.success) {
                    if (info.user) {
                        this.user = info.user._id;
                        this.userLoggedIn = true;
                        this.ownerLoggedIn = false;
                        if (info.user.favorites.includes(this.businessId)) {
                            this.favorited = true;
                        } else {
                            this.favorited = false;
                        }
                    } else if (info.business._id == this.businessId) {
                        this.ownerLoggedIn = true;
                        this.userLoggedIn = false;
                    } else {
                        this.ownerLoggedIn = false;
                        this.userLoggedIn = false;
                    }
                } else {
                    this.ownerLoggedIn = false;
                    this.userLoggedIn = false;
                }
            });

            this.businessPageService.getBusinessInfo(this.businessId).subscribe(
                (info) => {
                    this.name = info.data.name;
                    this.logo = info.data.logo;
                    if (info.data.address != null) {
                        this.address = info.data.address;
                        this.addressAvailable = true;
                    }
                    if (info.data.phoneNumbers.length != 0) {
                        this.phoneNumbers = info.data.phoneNumbers;
                        this.phoneNumbersAvailable = true;
                    }
                    this.description = info.data.description;
                    if (info.data.workingDays.length != 0) {
                        this.workingDays = info.data.workingDays;
                        this.workingDaysAvailable = true;
                    }
                    this.email = info.data.email;
                    if (info.data.category != null) {
                        this.category = info.data.category;
                        this.categoryAvailable = true;
                    }
                    if (info.data.workingHours != null) {
                        this.workingFrom = info.data.workingHours.from;
                        this.workingTo = info.data.workingHours.to;
                        this.workingHoursAvailable = true;
                    }


                    if (info.data.photos.length != 0) {
                        this.photos.length = info.data.photos.length - 1;
                        if(info.data.photos.length > 1)
                            this.photos[0] = info.data.photos[1];
                        for (var _i = 1; _i < this.photos.length; _i++) {
                            this.photos[_i] = info.data.photos[_i + 1];
                        }
                        this.firstPhoto = info.data.photos[0];
                        this.noPhotos = false;
                    } else {
                        this.noPhotos = true;
                    }
                    this.paymentRequired = info.data.paymentRequired;
                    if (info.data.deposit != null) {
                        this.deposit = info.data.deposit;
                        this.depositAvailable = true;
                    }
                    switch (this.paymentRequired) {
                        case 1: this.paymentStatus = "Full payment needed in advance."; break;
                        case 2: this.paymentStatus = "A " + this.deposit + "% deposit needed in advance."; break;
                        case 3: this.paymentStatus = "No payment needed in advance."; break;
                        default: this.paymentStatus = "No payment needed in advance.";
                    }
                    this.loadDone = true;
                }, (err) => {
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

            this.businessPageService.getAverageRating(this.businessId).subscribe(
                (info) => {
                    this.rating = info.data.toFixed(1);
                    this.ratingNumber = info.data;
                }, (err) => {
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

            this.businessPageService.getActivities(this.businessId).subscribe(
                (info) => {
                    this.activities = info.data;
                    if (this.activities.length != 0) {
                        this.activitiesAvailable = true;
                    }
                }, (err) => {
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

            this.businessPageService.getReviews(this.businessId).subscribe(
                (info) => {
                    this.reviews = info.data;
                    if (this.reviews.length != 0) {
                        this.reviewsAvailable = true;
                    }
                }, (err) => {
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

            this.businessPageService.updateInteractivity(this.businessId).subscribe(
                (info) => {

                }, (err) => {
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
        }, (err) => {
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

    addFavorite() {
        this.businessPageService.addFavorite(this.businessId).subscribe(
            (info) => {
                this.favorited = true;
                this.initialize();
            }, (err) => {
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

    deleteFavorite() {
        bootbox.confirm({
            title: "Delete Favorite",
            message: "Are you sure you want to remove this business from your favorites?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: (result) => {
                if (result) {
                    this.businessPageService.deleteFavorite(this.businessId).subscribe(
                        (data) => {
                            this.favorited = false;
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
                    );
                }
            }
        });
    }

    truncate(text) {
        if (text.length > 100) {
            let newText = text.slice(0, 90);
            newText += "...";
            return newText;
        }
        return text;
    }

    sendMessage() {

        this.route.params.subscribe(
            (params) => {
                this.business = params['businessId'];
                this.destID = params['businessId'];

                this.directMessagingService.existingThread(this.user, this.business).subscribe(
                    (thread) => {
                        if(thread.data){
                          this.thread = thread.data;
                          this.directMessagingService.addMessage(this.thread._id, this.message).subscribe(
                              (data) => {
                                this.messageDone = true;
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
                        else{
                          this.directMessagingService.newThread(this.destID, this.message).subscribe(
                              (thread) => {
                                  this.thread = thread.data;
                                  this.messageDone = true;
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
    }

    onMessageDone(){
      this.messageDone = false;
      this.message = null;
    }
    goToMessages(){
      this.router.navigateByUrl('/chat');
    }
    onMessageCancel(){
      this.message = null;
    }

    trimDays(days){
      let string = "";
      days.forEach((item, i) => {
        string = string + item + " | ";
      });
      string = string.slice(0, -3);
      return string;
    }
}
