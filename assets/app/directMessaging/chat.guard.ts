import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {CanActivate} from '@angular/router'
import {AppService} from '../app.service';
import { Http, Headers, Response} from '@angular/http';

@Injectable()
export class ChatGuard implements CanActivate {
    constructor(
        private appService: AppService,
        private router: Router,
        private http: Http
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://54.213.175.206:8080/api/currentUser', { headers: headers }).map((response) => {
            let res = response.json();
            if (res.success) {
                return true;
            }
            this.router.navigate(["/homepage"]);
            return false;

        }).first();

    }
}
