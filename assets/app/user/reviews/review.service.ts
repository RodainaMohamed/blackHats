import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Review } from "./review.model";

@Injectable()
export class ReviewService {
    private reviews: Review[] = [];
    reviewIsEdit = new EventEmitter<Review>();

    constructor(private http: Http) {}

  /*  addReview(review: Review) {
        const body = JSON.stringify(review);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:8080/api/review/'+review.reviewId+'/add', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const review = new Review(result.obj.comment,5, null, null, null);
                this.reviews.push(review);
                return review;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
*/
    getReviews() {
        return this.http.get('http://localhost:8080/api/review/user/:userId')
            .map((response: Response) => {
                const reviews = response.json().obj;
                let transformedReviews: Review[] = [];
                for (let review of reviews) {
                    transformedReviews.push(new Review(review.comment,5, null, null, null));
                }
                this.reviews = transformedReviews;
                return transformedReviews;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    /*editReview(review: Review) {
        this.reviewIsEdit.emit(review);
    }*/

    /*updateReview(review: Review) {
        const body = JSON.stringify(review);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:8080/message/' + review.reviewId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }*/

//fix:
    /*deleteReview(review: Review) {
        this.reviews.splice(this.reviews.indexOf(review), 1);
        return this.http.delete('http://localhost:8080/api/review/' + review.reviewId+ '/delete')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }*/
}