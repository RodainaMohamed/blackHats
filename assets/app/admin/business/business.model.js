var Business = (function () {
    function Business(_id, name, email, location, averageRating, createdAt) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.location = location;
        this.averageRating = averageRating;
        this.createdAt = createdAt;
    }
    return Business;
}());
export { Business };
