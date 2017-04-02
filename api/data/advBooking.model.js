const mongoose = require('mongoose');


const advBookingSchema = new mongoose.Schema({
    business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true
  },
  advSlot: {
    type: mongoose.Schema.Types.ObjectId,   //chosen ad slot's id
    ref: "AdvSlot",
    required: true
  },
  image:{
    type: String
  },
  startTime: {
      type: Date,
      required: true
    },
  endTime: {
      type: Date,
      required: true
    }
});

mongoose.model('AdvBooking', advBookingSchema);
