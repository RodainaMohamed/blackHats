import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "./user.service";
import { AppService } from '../app.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
    selector: 'user-profile',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
    public showReviews = true;
    public showFavorites = false;
    public showBookings = false;
    public editProfile = false;

     profilePicture: String;
    public loggedin: Boolean;
     isUser: Boolean;
     user: Object;
     loadDone = false;

    userId: String = "";
    favorites: Object[];
    firstName: String;
    lastName: String;
    email: String;
    birthDate: Date;
    createdAt: Date;
    path: String = "";


    constructor(
        private activatedRoute: ActivatedRoute,
        private appService: AppService,
        private userService: UserService,
        private router: Router,
        private http: Http) { }

    ngOnInit() {
        //getting the userId in the route:
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.userId = params['userId'];

                this.appService.getCurrentUser().subscribe(
                    (data) => {
                        //if the logged in user has the same ud as the id in the route
                        if (data.success && data.user && data.user._id == this.userId) {
                            //case 1: a user is logged in:
                            this.loggedin = true;
                            this.user = data.user;
                            this.firstName = data.user.firstName;
                            this.lastName = data.user.lastName;
                            this.email = data.user.email;
                            this.birthDate = data.user.birthDate;
                            this.createdAt = data.user.createdAt;
                            if (data.user.profilePicture != null) {
                                this.path = "http://54.213.175.206:8080/api/image/profilePictures/";
                                this.profilePicture = data.user.profilePicture;
                            }
                            else {
                                this.path = "";
                                this.profilePicture = "http://54.213.175.206:8080/api/image/profilePictures/defaultpp.jpg";
                            }
                            this.loadDone = true;
                        }

                        //if no one is logged in or logged in user not the one in the route:
                        else {
                            this.loggedin = false;

                            this.userService.getOneUser(this.userId).subscribe(
                                (info) => {
                                    this.user = info.data;
                                    this.firstName = info.data.firstName;
                                    this.lastName = info.data.lastName;
                                    this.email = info.data.email;
                                    this.birthDate = info.data.birthDate;
                                    this.createdAt = info.data.createdAt;
                                    if (info.data.profilePicture != null) {
                                        this.path = "http://54.213.175.206:8080/api/image/profilePictures/";
                                        this.profilePicture = info.data.profilePicture;
                                    }
                                    else {
                                        this.path = "";
                                        this.profilePicture = "http://54.213.175.206:8080/api/image/profilePictures/defaultpp.jpg";
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
        $("#back-to-top").click();
    }

    onReviewsClick() {
        this.showReviews = true;
        this.showFavorites = false;
        this.showBookings = false;
        this.editProfile = false;
    }

    onFavoritesClick() {
        this.showReviews = false;
        this.showFavorites = true;
        this.showBookings = false;
        this.editProfile = false;
    }

    onBookingsClick() {
        this.showReviews = false;
        this.showFavorites = false;
        this.showBookings = true;
        this.editProfile = false;
    }

    onEditProfileClick() {
        this.showReviews = false;
        this.showFavorites = false;
        this.showBookings = false;
        this.editProfile = true;

    }
    isLoggedIn() {
        return this.loggedin;
    }

    profileChanged(user: any) {
        this.path = "http://54.213.175.206:8080/api/image/profilePictures/";
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthDate = user.birthDate;
        this.profilePicture = user.profilePicture;
    }
}
