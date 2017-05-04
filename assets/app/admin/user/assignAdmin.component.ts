import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    selector: 'app-admin-user-assignAdmin',
    templateUrl: './assignAdmin.component.html'
})


export class AssignAdminComponent implements OnInit {
     users: User[] = [];
     loading: boolean = false;
    constructor(private userService: UserService) { }
    ngOnInit() {
        this.userService.getNonAdmins().subscribe(users => {
            this.users = users;
            setTimeout(this.onLast, 0);
        },
            err => {
                bootbox.alert(err.msg);
            });
        $('.modal-backdrop').css('z-index', '-1');
    }

    isLoading() {
        return this.loading;
    }

    onLast() {
        $('#datatable').dataTable();
    }

    assignAdmin(userId: string) {
        bootbox.confirm({
            title: "Assign Admin?",
            message: "Are you sure you want to assign this user as an admin?",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Assign'
                }
            },
            callback: (result) => {
                if (result) {
                    this.loading = true;
                    this.userService.assignAdmin(userId).subscribe(msg => {
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
