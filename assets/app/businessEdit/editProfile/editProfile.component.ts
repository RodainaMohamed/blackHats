import { Component, OnInit, NgModule } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { EditProfileService } from "./editProfile.service";
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AppService } from '../../app.service';
import { EventEmitter } from "@angular/common/src/facade/async";



@Component({
    selector: 'app-editProfile',
    templateUrl: './editProfile.component.html',
    styleUrls: ['./editProfile.component.css']
})

export class EditProfileComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({ url: 'http://54.213.175.206:8080/api/business/addLogo', itemAlias: "myfile" });
    private logo: String;
    name: String;
    workingFrom: Date;
    workingTo: Date;
    category: String;
    description: String;
    paymentRequired: Number;
    deposit: Number;
    depositFlag: boolean = false;
    phoneNumbers: String[];
    workingDays: String[];
    tags: String[];
    extraNumber: String = "";
    extraTag: String = "";
    extraDay: String = "";
    path: String = "";
    businessId: String;
    lat: number = 30.044281;
    lng: number = 31.340002;
    address: String = "";
    city: String = "";

    //warnings
    descriptionRequired = false;
    nameRequired = false;
    depositRequired = false;

    //days

    saturday: Boolean = false;
    sunday: Boolean = false;
    monday: Boolean = false;
    tuesday: Boolean = false;
    wednesday: Boolean = false;
    thursday: Boolean = false;
    friday: Boolean = false;


    constructor(
        private editProfileService: EditProfileService,
        private router: Router,
        private appService: AppService,
        private http: Http) { }

    ngOnInit() {
        this.initialise();
        $('form').on('focus', 'input[type=number]', function(e) {
            $(this).on('mousewheel.disableScroll', function(e) {
                e.preventDefault()
            })
        })
        $('form').on('blur', 'input[type=number]', function(e) {
            $(this).off('mousewheel.disableScroll')
        })
    }

    initialise() {
        this.appService.getCurrentUser().subscribe(
            (data) => {
                if (data.success && data.business) {
                    this.businessId = data.business._id;

                    this.editProfileService.getBusinessProfile(this.businessId).subscribe(
                        (data) => {
                            this.name = data.data.name;
                            if (data.data.workingHours != null) {
                                this.workingFrom = data.data.workingHours.from;
                                this.workingTo = data.data.workingHours.to;
                            }
                            this.category = data.data.category;
                            this.description = data.data.description;
                            this.paymentRequired = data.data.paymentRequired;
                            if (data.data.paymentRequired == 2) {
                                this.depositFlag = true;
                            }
                            else {
                                this.depositFlag = false;
                            }
                            this.deposit = data.data.deposit;
                            this.phoneNumbers = data.data.phoneNumbers;
                            this.tags = data.data.tags;
                            this.fillDays(data.data.workingDays);
                            // this.workingDays = data.data.workingDays;
                            if (data.data.location != null) {
                                this.lng = data.data.location.coordinates[0];
                                this.lat = data.data.location.coordinates[1];
                                this.address = data.data.location.address;
                                this.city = data.data.location.city;
                            }
                            if (data.data.logo != null) {
                                this.path = "http://54.213.175.206:8080/api/image/businessLogos/";
                                this.logo = data.data.logo;
                            }
                            else {
                                this.path = "";
                                this.logo = "http://54.213.175.206:8080/api/image/businessLogos/defaultBLogo.jpg";
                            }
                            this.uploader = new FileUploader({ url: 'http://54.213.175.206:8080/api/business/addLogo', itemAlias: "myfile" });
                            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

                              var res = JSON.parse(response);
                              var msg = res.msg;

                              if(!(status == 201)) {
                                bootbox.alert(msg);
                              }
                              else{
                                let res = JSON.parse(response);
                                this.path = "http://54.213.175.206:8080/api/image/businessLogos/";
                                this.logo = res.data.imagePath;
                              }
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
            })

    }

    updateProfile() {
        if (!this.name || this.name.trim().length == 0) {
            this.nameRequired = true;
        }
        else {
            this.nameRequired = false;
        }

        if (!this.description || this.description.trim().length == 0) {
            this.descriptionRequired = true;
        }
        else {
            this.descriptionRequired = false;
        }
        if (this.depositFlag && (!this.deposit || this.deposit == 0)) {
            this.depositRequired = true;
        }
        else {
            this.depositRequired = false;
        }

        if (!this.descriptionRequired && !this.nameRequired && !this.depositRequired) {
            let workingHours = {
                from: this.workingFrom,
                to: this.workingTo
            };
            let location = {
                address: this.address,
                city: this.city,
                coordinates: [this.lng, this.lat]
            }
            let days = this.getDays();
            this.editProfileService.editBusinessProfile(this.name, workingHours, days, this.category, location, this.description, this.phoneNumbers, this.tags, this.paymentRequired, this.deposit).subscribe(
                (data) => {
                    bootbox.alert("Profile updated.");
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
        else {
            $("#back-to-top").click();
        }
    }

    cancel() {
        this.initialise();
    }

    showDeposit(value) {
        if (value == 2) {
            this.depositFlag = true;
        }
        else {
            this.depositFlag = false;
        }
    }

    addPhoneNumber() {
        if (this.extraNumber != "") {
            this.phoneNumbers.push(this.extraNumber);
            this.extraNumber = "";
        }
    }

    removePhoneNumber(index) {
        this.phoneNumbers.splice(index, 1);
    }

    addTag() {
        if (this.extraTag != "") {
            this.tags.push(this.extraTag);
            this.extraTag = "";
        }
    }

    removeTag(index) {
        this.tags.splice(index, 1);
    }

    addWorkingDay() {
        if (this.extraDay != "") {
            this.workingDays.push(this.extraDay);
            this.extraDay = "";
        }
    }

    removeWorkingDay(index) {
        this.workingDays.splice(index, 1);
    }

    onUpload() {
        this.uploader.uploadAll();
    }

    markerDragEnd($event) {
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    }

    mapClicked($event) {
        this.lat = $event.coords.lat;
        this.lng = $event.coords.lng;
    }

    hideDescriptionWarning() {
        this.descriptionRequired = false;
    }

    hideNameWarning() {
        this.nameRequired = false;
    }

    hideDepositWarning() {
        this.depositRequired = false;
    }

    fillDays(days: string[]){
      days.forEach((item, index) => {
        switch(item){
          case "Saturday":
            this.saturday = true;
            break;
          case "Sunday":
            this.sunday = true;
            break;
          case "Monday":
            this.monday = true;
            break;
          case "Tuesday":
            this.tuesday = true;
            break;
          case "Wednesday":
            this.wednesday = true;
            break;
          case "Thursday":
            this.thursday = true;
            break;
          case "Friday":
            this.friday = true;
            break;
          default:
            break;
        }
      });
    }

    getDays(){
      let days = [];
      if(this.saturday)
        days.push("Saturday");
      if(this.sunday)
        days.push("Sunday");
      if(this.monday)
        days.push("Monday");
      if(this.tuesday)
        days.push("Tuesday");
      if(this.wednesday)
        days.push("Wednesday");
      if(this.thursday)
        days.push("Thursday");
      if(this.friday)
        days.push("Friday");
      return days;
    }

}
