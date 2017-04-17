import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-user-favorites',
  templateUrl: './userFavorites.component.html'
})
export class UserFavoritesComponent implements OnInit {
  ids: [String];
  businesses: [Object];
  userId: String = "58f252bd9037f62725ddf62c";

  constructor(
    private userService: UserService,
    private router: Router,
    private http: Http) { }

  ngOnInit() {

    this.userService.getOneUser(this.userId).subscribe(data => {
      if (data.err) {
        console.error(data.msg);
      }
      else {
        this.ids = data.data.favorites;
        var businesses = [];
        for (var i = 0; i < this.ids.length; i++){
          this.userService.getCurrentInfo(this.ids[i]).subscribe(data => {
            if (data.err) {
              console.error(data.msg);
            }
            else {
              businesses.push(data.data);
            }
          });
        }
        this.businesses = businesses as [Object];
      }
    });

  }
}
