var SupportRequest = (function () {
    function SupportRequest(_id, title, contactEmail, contactPhoneNumber, accountType, registeredEmail, description, createdAt) {
        this._id = _id;
        this.title = title;
        this.contactEmail = contactEmail;
        this.contactPhoneNumber = contactPhoneNumber;
        this.accountType = accountType;
        this.registeredEmail = registeredEmail;
        this.description = description;
        this.createdAt = createdAt;
    }
    return SupportRequest;
}());
export { SupportRequest };
