import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DirectMessagingService {

    constructor(private http: Http) { }

    existingThread(user, business) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = {
            userID: user,
            businessID: business
        };
        return this.http.post('http://localhost:8080/api/thread/findExistingThread', body, { headers: headers }).map(res => res.json());
    }

    newThread(destID, message) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        message: message
      }
      return this.http.post('http://localhost:8080/api/thread/add/' + destID, body, { headers: headers }).map(res => res.json());
    }

    addMessage(threadID, message){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        content: message
      }
      return this.http.post('http://localhost:8080/api/thread/addMessage/' + threadID, body, { headers: headers }).map(res => res.json());
    }
}
