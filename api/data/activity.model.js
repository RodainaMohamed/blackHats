const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: [{
        type: String
    }],
    bookingsPerSlot: {
        type: Number,
        required: true
    },
    slots: [{
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        }
    }],
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
});

activitySchema.pre('remove', function(next){
	var activity = this;
	activity.model('Booking').find(
        { _id: {$in: activity.bookings}},
        function(err, bookings){
          for(var i = 0; i < bookings.length; i++){
            bookings[i].remove();
          }
          next();
        }
     );
});

mongoose.model('Activity', activitySchema);
