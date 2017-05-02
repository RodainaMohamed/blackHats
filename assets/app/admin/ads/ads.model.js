var AdSlot = (function () {
    function AdSlot(_id, name, price, length, width) {
        this._id = _id;
        this.name = name;
        this.price = price;
        this.length = length;
        this.width = width;
    }
    return AdSlot;
}());
export { AdSlot };
