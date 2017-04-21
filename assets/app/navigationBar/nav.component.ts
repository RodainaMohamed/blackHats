import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { LoginService } from '../user/login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls : ['./nav.component.css']
})
export class NavComponent implements OnInit {

//to check for this part later
  private loggedin: Boolean;
  private isUser: Boolean;
  private user: Object;
  private business: Object;
  private path: String = "http://localhost:8080/";

  constructor(
    private appService: AppService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.appService.getCurrentUser().subscribe(data => {
      console.log(data);
      if(data.success){
        if(data.user){
          this.user = data.user;
          this.isUser = true;

        }
        else{
          this.business = data.business;
          this.isUser = false;
        }
        this.loggedin = true;
      }
      else{
        this.loggedin = false;
      }
    });
  }

  loggedIn(args:any){
    this.appService.getCurrentUser().subscribe(data => {
      console.log(data);
      if(data.success){
        if(data.user){
          this.user = data.user;
          this.isUser = true;

        }
        else{
          this.business = data.business;
          this.isUser = false;
        }
        this.loggedin = true;
      }
      else{
        this.loggedin = false;
      }
    });
  }

  onLogout(){
    this.loginService.logout().subscribe(data => {
      console.log('logged out');
      this.loggedin = false;
    }, err => {
      console.log('log out failed');
    });
    }

}
