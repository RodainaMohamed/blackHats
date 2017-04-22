import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { EditUserProfileService} from "./editProfile.service"
import { Router } from '@angular/router';
import {Http, Headers } from '@angular/http';
//import { Business } from "../../../api/data/business.model";
import 'rxjs/add/operator/map';


@Component({
    selector: 'app-editUserProfile',
    templateUrl: './editProfile.component.html',
    styleUrls: ['./editProfile.component.css']
})

export class EditUserProfileComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({ url: 'http://localhost:8080/api/user/profile/uploadProfilePicture', itemAlias: "myfile" });
    private profilePicture: String;
    firstName: String;
    lastName: String;
    birthDate: Date;

    path: String = "";
    userId: String = "58f252bd9037f62725ddf62c";

    constructor(
        private editProfileService: EditUserProfileService,
        private router: Router,
        private http: Http) { }

    ngOnInit() {
        this.initialise();
    }
    initialise() {
        this.editProfileService.getOneUser(this.userId).subscribe(
            (data) => {
                this.firstName = data.data.firstName;
                this.lastName = data.data.lastName;
                this.birthDate = data.data.birthDate;

                if (data.data.profilePicture != null) {
                    this.path = "http://localhost:8080/api/image/profilePictures/";
                    this.profilePicture = data.data.profilePicture;
                }
                else {
                    this.path = "";
                    this.profilePicture = "http://localhost:8080/api/image/profilePictures/defaultpp.jpg";
                }
                this.uploader = new FileUploader({ url: 'http://localhost:8080/api/user/profile/uploadProfilePicture', itemAlias: "myfile" });
                this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                    switch (status) {
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
                    this.initialise();
                };
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

    updateProfile() {
        this.editProfileService.editUserProfile(this.firstName, this.lastName, this.birthDate).subscribe(
            (data) => {
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

        //this.router.navigateByUrl('dummy');
        //this.router.navigateByUrl('user');
    }


    onUpload() {
        this.uploader.uploadAll();
    }

    deleteAccount() {
        this.editProfileService.deleteAccount().subscribe(
            (data) => {
                this.router.navigateByUrl('/');
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
