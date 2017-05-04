const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    slot: {
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        }
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
  		type: Date,
  		required: true
  	}
});

bookingSchema.pre('remove', function(next){
	var booking = this;
	booking.model('Activity').update(
        { _id: booking.activity},
        { $pull: { bookings: booking._id } },
        { multi: true },
        next
     );
});

bookingSchema.pre('remove', function(next){
	var booking = this;
	booking.model('User').update(
        { _id: booking.user},
        { $pull: { bookings: booking._id } },
        { multi: true },
        next
     );
});

mongoose.model('Booking', bookingSchema);
