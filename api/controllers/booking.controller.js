const mongoose = require("mongoose");
const Booking = mongoose.model("Booking");
const Activity = mongoose.model("Activity");
const User = mongoose.model("User");
const Business = mongoose.model("Business");


/*
  Post function that handles booking an activity
  It creates a new booking and saves it in database
  And updates bookings array in concered Activity and User
  Calling route: /api/activity/book
  Parameters: {
    slot: "An object consist of two dates, startTime and endTime",
    activity: "id of the activity being booked",
    user: "id of the user making the booking"
  }
*/
module.exports.bookActivity = function(req, res) {
    // Create new Booking object using parameters from request
    const newBooking = new Booking({
      slot: req.body.slot,
      activity: req.body.activity,
      user: req.body.user,
      date: req.body.date
    });
    // Save new booking in database
    newBooking.save(function (err, booking) {
      // If there is an error return it in response
      if (err) return res.json({success: false, msg: 'Error adding the booking', error: err});

      // Find user by his id and insert the booking id in his bookings array
      User.findByIdAndUpdate(
        booking.user,
        {$push:{"bookings": booking._id}},
        {safe: true, upsert: true, new: true},
        function(err, user) {
          // If there is an error return it in response
          if(err) res.json({success: false, msg: "Error updating user", error: err});

          // Find activity by it's id and insert the booking id in it's bookings array
          Activity.findByIdAndUpdate(
            booking.activity,
            {$push:{"bookings": booking._id}},
            {safe: true, upsert: true, new: true},
            function(err, activity) {
              // If there is an error return it in response
              if (err) res.json({success: false, msg: "Error updating activity", error: err});

              // If no errors occur, respond with success = true
              res.json({success: true, msg: "Booked an activity successfully"});
            }
          );
        }
      );
    });
};
