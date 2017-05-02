import { Business } from './business.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BusinessService } from './business.service';


@Component({
  selector: 'app-admin-business-verify',
  templateUrl: './verify.component.html'
})


export class VerifyComponent implements OnInit {
   businesses: Business[] = [];
   loading: boolean = false;

  constructor(private businessService: BusinessService) { }
  ngOnInit() {
    this.businessService.getUnverifiedBusinesses().subscribe(businesses => {
      this.businesses = businesses
    },
      err => {
        bootbox.alert(err.msg);
        $('.modal-backdrop').css('z-index', '-1');
      });
  }

  isLoading() {
    return this.loading;
  }

  verifyBusiness(businessId: string) {
    bootbox.confirm({
      title: "Verify Business?",
      message: "Are you sure you want to verify this business?",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Verify'
        }
      },
      callback: (result) => {
        if (result) {
          this.loading = true;
          this.businessService.verifyBusiness(businessId).subscribe(msg => {
            bootbox.alert(msg, () => {
              location.reload();
            });
            $('.modal-backdrop').css('z-index', '-1');
          },
            err => {
              bootbox.alert(err.msg, () => {
                location.reload();
              });
              $('.modal-backdrop').css('z-index', '-1');
            });
        }
      }
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  rejectBusiness(businessId: string) {
    bootbox.confirm({
      title: "Reject Business?",
      message: "Are you sure you want to reject this business? This cannot be undone.",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Reject'
        }
      },
      callback: (result) => {
        if (result) {
          this.loading = true;
          this.businessService.deleteBusiness(businessId).subscribe(msg => {
            bootbox.alert(msg, () => {
              location.reload();
            });
            $('.modal-backdrop').css('z-index', '-1');
          },
            err => {
              bootbox.alert(err.msg, () => {
                location.reload();
              });
              $('.modal-backdrop').css('z-index', '-1');
            });
        }
      }
    });
    $('.modal-backdrop').css('z-index', '-1');
  }
};
