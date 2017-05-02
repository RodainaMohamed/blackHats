var Business = (function () {
    function Business(businessId, name, logo, reviews, email, phoneNumbers, workingDays, workingHours, location, tags, category, description, interactivity, totalRatings, photos, paymentRequired, deposit, averageRating) {
        this.businessId = businessId;
        this.name = name;
        this.logo = logo;
        this.reviews = reviews;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
        this.workingDays = workingDays;
        this.workingHours = workingHours;
        this.location = location;
        this.tags = tags;
        this.category = category;
        this.description = description;
        this.interactivity = interactivity;
        this.totalRatings = totalRatings;
        this.photos = photos;
        this.paymentRequired = paymentRequired;
        this.deposit = deposit;
        this.averageRating = averageRating;
    }
    return Business;
}());
export { Business };
