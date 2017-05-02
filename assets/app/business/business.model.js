//Create a Class for the business created in the Component to be passed back to the backend
var Business = (function () {
    function Business(name, password, confirmPassword, email, description) {
        this.name = name;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
        this.description = description;
    }
    return Business;
}());
export { Business };
