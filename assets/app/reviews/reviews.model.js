//Create a Class for the review created in the Component to be passed back to the backend
var Review = (function () {
    function Review(comment, rating, business, user, time) {
        this.comment = comment;
        this.rating = rating;
        this.business = business;
        this.user = user;
        this.time = time;
    }
    return Review;
}());
export { Review };
