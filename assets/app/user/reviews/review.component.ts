import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../user.service";
import { AppService } from '../../app.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserComponent } from "../user.component";


@Component({
    selector: 'user-review',
    templateUrl: './review.component.html',

})

export class ReviewComponent implements OnInit {

    count: number = 0;
    reviews: any[];
    userId: String = "";
    averageString: String;
    loggedIn: Boolean;
    editing: Boolean[] = [];
    editIndex = 0;
    editComment: String;
    editRating: Number;
    isUser = false;
    editCommentWarning = false;
    loadDone = false;


    constructor(
        private activatedRoute: ActivatedRoute,
        private userComponent: UserComponent,
        private appService: AppService,
        private userService: UserService,
        private router: Router,
        private http: Http) { }

    ngOnInit() {

        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.userId = params['userId'];
                this.appService.getCurrentUser().subscribe(
                    (data) => {
                        if (data.success) {
                            if (data.user) {
                                this.isUser = true;
                                if (this.userId == data.user._id) {
                                    this.loggedIn = true;
                                }
                                else {
                                    this.loggedIn = false;
                                }
                            }
                            else {
                                this.loggedIn = false;
                            }
                        }
                        else {
                            this.loggedIn = false;
                        }
                        this.userService.getReviews(this.userId).subscribe(
                            (data) => {
                                this.reviews = data.data;
                                this.count = this.reviews.length;
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

    onDelete(i) {
        var _this = this;
        bootbox.confirm({
            title: "Delete Review",
            message: "Are you sure you want to delete this review?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.editIndex = i;
                    _this.userService.deleteReview(_this.reviews[i]._id).subscribe(
                        (data) => {
                            _this.reviews.splice(i, 1);
                            _this.editing[i] = false;
                            _this.count = _this.count - 1;
                        },
                        (err) => {
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
                }

            }
        });
    }

    onSave(i) {
        if (!this.editComment || this.editComment.trim().length == 0) {
            return this.editCommentWarning = true;
        }
        else {
            this.editCommentWarning = false;
        }
        this.editIndex = i;
        this.userService.editReview(this.reviews[i]._id, this.editComment, this.editRating).subscribe(
            (data) => {
                this.reviews[i].comment = this.editComment;
                this.reviews[i].rating = this.editRating;
                this.editing[i] = false;
                this.editComment = null;
                this.editRating = null;
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

    onCancel(i) {
        this.editIndex = i;
        this.editing[i] = false;
        this.hideCommentWarning();
    }

    onEdit(i) {
        for (var j = 0; j < this.editing.length; j++) {
            this.editing[j] = false;
        }
        this.editing[i] = true;
        this.editComment = this.reviews[i].comment;
        this.editRating = this.reviews[i].rating;
    }

    hideCommentWarning() {
        this.editCommentWarning = false;
    }
}
