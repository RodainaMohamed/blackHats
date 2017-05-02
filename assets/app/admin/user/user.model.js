var User = (function () {
    function User(_id, firstName, lastName, email, username, birthDate, admin, createdAt, verified) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.birthDate = birthDate;
        this.admin = admin;
        this.createdAt = createdAt;
        this.verified = verified;
    }
    return User;
}());
export { User };
