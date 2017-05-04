import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SupportRequest } from './support.model';
import { SupportService } from './support.service';

@Component({
  selector: 'app-admin-support',
  templateUrl: './support.component.html'
})


export class SupportComponent implements OnInit {
   requests: SupportRequest[] = [];
   loading: boolean = false;

  constructor(private supportService: SupportService) { }
  ngOnInit() {
    this.supportService.getRequests().subscribe(requests => {
      this.requests = requests;
      setTimeout(this.onLast, 0);
    },
      err => {
        bootbox.alert(err.msg);
        $('.modal-backdrop').css('z-index', '-1');
      });
  }

  isLoading() {
    return this.loading;
  }

  onLast() {
    $('#datatable').dataTable();
  }

  recoverAccount(requestId: string, accountFlag: string) {
    bootbox.confirm({
      title: "Recover Account?",
      message: "Are you sure you want to allow this person access to his account with a temprary password? This cannot be undone.",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Allow'
        }
      },
      callback: (result) => {
        if (result) {
          this.loading = true;
          this.supportService.recoverAccount(requestId, accountFlag).subscribe(msg => {
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

  rejectRequest(requestId: string) {
    bootbox.confirm({
      title: "Reject Request?",
      message: "Are you sure you want to delete this request? This cannot be undone.",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Delete'
        }
      },
      callback: (result) => {
        if (result) {
          this.loading = true;
          this.supportService.rejectRequest(requestId).subscribe(msg => {
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
