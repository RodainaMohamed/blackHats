//Create a Class for the user created in the Component to be passed back to the backend
var User = (function () {
    function User(firstName, lastName, username, password, confirmPassword, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
    }
    return User;
}());
export { User };
