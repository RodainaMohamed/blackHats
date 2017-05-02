var Activity = (function () {
    function Activity(name, price, description, bookingsPerSlot, business, photos, slots, bookings, id) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.bookingsPerSlot = bookingsPerSlot;
        this.business = business;
        this.photos = photos;
        this.slots = slots;
        this.bookings = bookings;
    }
    return Activity;
}());
export { Activity };
