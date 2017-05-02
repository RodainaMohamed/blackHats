import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';


@Component({
  selector: 'app-admin-user-review',
  templateUrl: './review.component.html'
})


export class ReviewComponent implements OnInit {
   users: User[] = [];
   loading: boolean = false;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.userService.getUnverifiedUsers().subscribe(tempUsers => {
        this.users = users.concat(tempUsers);
      },
        err => {
          bootbox.alert(err.msg);
          $('.modal-backdrop').css('z-index', '-1');
        })
    });
  }

  isLoading() {
    return this.loading;
  }

  deleteUser(userId: string, verified: boolean) {
    bootbox.confirm({
      title: "Delete User?",
      message: "Are you sure you want to delete this user? This cannot be undone.",
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
          this.userService.deleteUser(userId, verified).subscribe(msg => {
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

  viewUser(userId: string) {
    window.location.href = "/user/" + userId;
  }
};
