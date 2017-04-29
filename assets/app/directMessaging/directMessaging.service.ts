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
      return this.http.post('http://localhost:8080/api/api/thread/add/' + destID, { headers: headers }).map(res => res.json());
    }

    addMessage(threadID, message){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        content: message
      }
      return this.http.post('http://localhost:8080/api/thread/addMessage/' + threadID, body, { headers: headers }).map(res => res.json());
    }

    getThreads(srcID){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:8080/api/thread/getThreads/' + srcID, { headers: headers }).map(res => res.json());
    }

    deleteThread(threadID){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.delete('http://localhost:8080/api/thread/deleteThread/' + threadID, { headers: headers }).map(res => res.json());
    }

    getMessages(threadID){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:8080/api/thread/getMessages/' + threadID, { headers: headers }).map(res => res.json());
    }

    deleteMessage(messageID) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.delete('http://localhost:8080/api/thread/deleteMessage/' + messageID, { headers: headers }).map(res => res.json());
    }
}
