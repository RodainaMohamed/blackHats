const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
const path = require("path");
const Activity = mongoose.model("Activity");
const Business = mongoose.model("Business");


/*
  Get function that retrieves the activities offered by a Business from the database
  Calling route: api/activity/:businessId
*/
module.exports.getActivities = function(req, res) {

    //Finds all activities ofeered by a specific business according to its business ID
    Activity.find({
        "business": req.params.businessId
    }, function(err, activities) {

        //If an error occurred, display a msg along with the error
        if (err) return res.json({
            success: false,
            msg: 'Cannot retrieve activities'
        });

        //If no error return list of activities offered
        else res.json({
            success: true,
            msg: 'successful retrieval',
            activities
        });
    });
}

/* Put method that takes as a parameters the date and the Activity ID and returns
the free slots where the resgistered user can make a booking
Calling route: /activity/freeSlots */
module.exports.getAvailableSlots = function(req, res) {
  //values from the body of the put request
  const actdate = req.body.date;
  const actID = req.body.activityID;
  //Maximum bookings that can be made in one slot and is specified by the business
  var maxBookings = 0;
  //Retrieves the array of bookings of this activity according to it's activity ID
  Activity.findById(actID)
  //populate an array of references with booking objects being referenced
  .populate( {
    path: 'bookings',
    //filters to keep only bookings made on the date "actDate"
    match: {
      date: actdate
    }
  })
  .exec(function(err, bookedSlots) {
    //If an error occured return it in response
    if(err) return res.json({
      success: false,
      msg: "Error occured while retrieving slots"
    })
    //retrieves the slots specified by the business for their activity
    Activity.findById(actID, function(err, actSlots) {
      //If an error occured return it in response
      if(err) res.json({
        success: false,
        msg: "error occured while retrieving activity slots"
      });
      //Initializes the maxBookings according to the Activity
      maxBookings = actSlots.bookingsPerSlot;
      //Array that will contain all the available slots for booking
      var availableSlots = [];
      const counter = 0;
      //Loops over the array of slots specified by the business
      for(const i = 0; i < actSlots.slots.length; i++) {
        //counts the number of bookings made in that slot
        counter = 0;
      //Loops over the array of bookings made for that activity
      for (var j = 0; j < bookedSlots.bookings.length; j++) {
          //checks if the activity time is equal to the booking time
          const actStartTime = new Date(actSlots.slots[i].startTime);
          const bookingStartTime = new Date(bookedSlots.bookings[j].slot.startTime);
          const actEndTime = new Date(actSlots.slots[i].endTime);
          const bookingEndTime = new Date(bookedSlots.bookings[j].slot.endTime)
          if (actStartTime.getTime() == bookingStartTime.getTime()) {
              if (actEndTime.getTime() == bookingEndTime.getTime()){
                counter++;
              }
          }
      }
      //Checks if the counter is less than the maximum number of bookings per slot
      if(counter < maxBookings)
        //adds the slot into the array of available slots
        availableSlots.push(slots[i]);
    }
    //returns the array of available slots
    res.json( {
      success: true,
      msg: "successful retrieval of available slots",
      availableSlots : availableSlots })
      })
      })
}


/* Delete function that finds and deletes a specific slot in a specific activity
Calling route: api/activity/:activityId/deleteSlot */
module.exports.deleteSlot = function(req, res) {

    //Create constants to save them as Date format
    const start = new Date(req.body.startTime);
    const end = new Date(req.body.endTime);

    //Finding specified activity
    Activity.findById(req.params.activityId, function(err, activity) {

        //If an error occurred, display a msg along with the error
        if (err) {
            res.json({
                success: false,
                msg: 'There was a problem finding the desired activity'
            });
        }
        //If activity is found
        else {

            //Loop to find the slot in the slots array
            for (var i = 0; i < activity.slots.length; i++) {

                //Found flag
                var found = false;

                //Checking the specified time against the slots time
                if ((compareDate(start, activity.slots[i].startTime) == 0) && (compareDate(end, activity.slots[i].endTime) == 0)) {

                    //Function to remove slot from array
                    activity.slots.splice(i, 1);

                    //Save changes
                    activity.save(function(err, activity) {

                        //If an error occurred, display a msg along with the error
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Slot Not Deleted'
                            });
                        }

                        //If no error occurrs, display msg
                        else {
                            res.json({
                                success: true,
                                msg: 'Slot Deleted'
                            });
                        }
                    });

                    //Set flag and break
                    found = true;
                    break;
                }
            }

            //If slot does not exist
            if (!found) {
                res.json({
                    success: false,
                    msg: "Couldn't find desired slot"
                })
            }


        }
    });
};


/* Post function that adds a slot in a specific activity
Calling route: api/activity/:activityId/addSlot*/
module.exports.addSlot = function(req, res) {

    //Create constants to save them as Date format
    const start = new Date(req.body.startTime);
    const end = new Date(req.body.endTime);

    //Finding specified activity
    Activity.findById(req.params.activityId, function(err, activity) {

        //If an error occurred, display a msg along with the error
        if (err) {
            res.json({
                success: false,
                msg: 'There was a problem finding the desired activity'
            });
        }

        //If activity found
        else {

            //Flag for overlap
            var noOverlap = true;

            //Loop to find the slot in the slots array
            for (var i = 0; i < activity.slots.length; i++) {

                //Compare new and existing slot timings using helper function
                const compareStart = compareDate(activity.slots[i].startTime, end);
                const compareEnd = compareDate(start, activity.slots[i].endTime);

                //If no overlap
                if (!(x == -1 && y == -1)) {

                }
                //If overlap
                else {
                    noOverlap = false
                    break;
                }
            }

            // If flag is still set, no overlap
            if (noOverlap) {

                //Create new slot
                const newSlot = {
                    "startTime": start,
                    "endTime": end
                };

                //Push it in the array
                activity.slots.push(newSlot);

                //Save activity
                activity.save(function(err, activity) {

                    //If an error occurred, display a msg along with the error
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Slot Not Added'
                        });
                    }

                    //If no error occurrs, display msg
                    else {
                        res.json({
                            success: true,
                            msg: 'Slot Added'
                        });
                    }
                });
            }

            //If an error occurred, display a msg along with the error
            else {
                res.json({
                    success: false,
                    msg: 'Overlap'
                });
            }


        }
    });
};


/* Helper function that compares dates and returns
  date1 = date2 --> 0
  date1 > date2 --> 1
  date1 < date2 --> -1 */
function compareDate(date1, date2) {


    //Hours equal
    if (date1.getHours() == date2.getHours()) {

        //Check minutes
        if (date1.getMinutes() == date2.getMinutes()) {
            return 0;
        } else {
            if (date1.getMinutes() > date2.getMinutes()) {
                return 1;
            } else {
                return -1;
            }
        }
    }

    //Hours not equal
    else {
        if (date1.getHours() > date2.getHours()) {
            return 1;
        } else {
            return -1;
        }
    }
}


/* Multer configuration to upload a single file from an
html input with name "myfile" to public/uploads/activityPhotos folder*/
const uploadPhotos = multer({
    dest: path.join(__dirname, '../', '../public/uploads/activityPhotos')
}).single('myfile');


/*
Post function to upload photo using multer
and store the uploaded image path in the Activity
model in photos array, and return the
filepath to the frontend to show the image.
Calling route: '/api/activity/:activityId/addPhoto'
*/
module.exports.addPhoto = function(req, res) {
    //Check if business is logged in
    if (req.user) {
        //upload the image
        uploadPhotos(req, res, function(err) {
            //if an error occurred, return the error
            if (err) {
                return res.json(err);
            }
            /*if multer found a file selected
            and image was uploaded successfully,
            multer will save the image in req.file*/
            if (req.file) {
                //get the image format
                var string = req.file.originalname.substring(req.file.originalname.length - 3, req.file.originalname.length);

                //if it was jpeg add a "j" to the returned "peg"
                if (string === "peg")
                    string = "j" + string;

                //check if it is not a valid image format
                if (!(string === "png" || string === "jpg" || string === "jpeg")) {
                    //delete the uploaded file
                    fs.unlink(req.file.path);

                    //return the error message to frontend
                    return res.json({
                        error: "File format is not supported!"
                    });
                }
                //copy and rename the image to the following format and location
                var newPath = path.join(__dirname, "../", "../public/uploads/activityPhotos/img" + Date.now() + "." + string);
                fs.renameSync(req.file.path, newPath, function(err) {
                    if (err) throw err;

                    //delete the image with the old name
                    fs.unlink(req.file.path);
                });

                //get the name part only from the uploaded image
                var nameLength = ("img" + Date.now() + string).length + 1;
                newPath = newPath.substring(newPath.length - nameLength);

                //add the image file name to the photos array of the Business model
                Activity.update({
                        "_id": req.params.activityId
                    }, {
                        $push: {
                            "photos": newPath
                        }
                    },
                    function(err, result) {
                        //couldn't add to array, return the error
                        if (err) {
                            res.json(err);
                        } else {
                            //if updating is ok
                            if (result) {
                                //return the file path to the frontend to show the image
                                res.json(newPath);
                            } else
                                res.json({
                                    error: "Activity not found"
                                });
                        }
                    });
            }
            //multer did not find a file selected to upload
            else {
                res.json({
                    error: "Choose a valid file"
                });
            }
        });
    }
    //user is not logged in
    else {
        res.json({
            error: "Please Login"
        });
    }
};


/*
delete function that deletes photo from activity's
photos array, and returns success message or error message.
Calling route: '/api/activity/activityId/deletePhoto/:photoPath'
*/
module.exports.deletePhoto = function(req, res) {
    var imagePath = req.params.photoPath;
    var activityId = req.params.activityId;
    Activity.update({
        "_id": activityId
    }, {
        $pull: {
            "photos": imagePath
        }
    }, function(err, data) {
        if (err) {
            res.json({
                success: false,
                msg: 'deleting photo failed'
            });
        } else {

            //add directory path to image name
            imagePath = path.join(__dirname, "../", "../public/uploads/activityPhotos/", req.params.photoPath);

            //delete the photo from filesystem
            fs.unlink(imagePath, function(err) {
                //don't care if file doesn't exist
            });
            res.json({
                success: true,
                msg: 'photo deleted successfully'
            });
        }
    });
};
