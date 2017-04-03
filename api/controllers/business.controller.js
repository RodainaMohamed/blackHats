const multer = require('multer');
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Business = mongoose.model("Business");
const fs = require('fs');
const path = require("path");
const nodemailer = require('nodemailer');


/* Multer configuration to upload a single file from an
html input with name "myfile" to public/uploads/businessPhotos folder*/
const uploadPhotos = multer({
    dest: path.join(__dirname, '../', '../public/uploads/businessPhotos')
}).single('myfile');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'blackhatsguc@gmail.com',
        pass: 'youmwarayoum'
    }
});


/*3.3:
Upload photo using multer
and store the uploaded image path in the Business
model in photos array, and return the
filepath to the frontend to show the image.
Calling route: '/business/:businessId/addPhoto'
*/
module.exports.addPhoto = function(req, res) {
    //Check if business logged in
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
                var newPath = path.join(__dirname, "../", "../public/uploads/businessPhotos/img" + Date.now() + "." + string);
                fs.renameSync(req.file.path, newPath, function(err) {
                    if (err) throw err;

                    //delete the image with the old name
                    fs.unlink(req.file.path);
                });

                //get the name part only from the uploaded image
                var nameLength = ("img" + Date.now() + string).length + 1;
                newPath = newPath.substring(newPath.length - nameLength);

                //add the image file name to the photos array of the Business model
                Business.update({
                        "_id": req.params.businessId
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
                                    error: "No business found"
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
            error: "login"
        });
    }
};


/*
delete function that deletes photo from business'
photos array, and returns success message or error message.
Calling route: '/business/:businessId/deletePhoto/:photoPath'
*/
module.exports.deletePhoto = function(req, res) {
    var imagePath = req.params.photoPath;
    var businessId = req.params.businessId;
    Business.update({
        "_id": businessId
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
            imagePath = path.join(__dirname, "../", "../public/uploads/businessPhotos/", req.params.photoPath);

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


/*
Post function that increments the interactivity attribute of a certain business by 1
Calling route: api/business/interact/:id
*/
module.exports.updateInteractivity = function(req, res) {
    Business.findById(req.params.id, function(err, business) {
        business.interactivity = business.interactivity + 1;
        business.save(function(err) {
            if (err) res.json({
                success: false,
                msg: 'Updating business interactivity failed'
            });
            res.json({
                success: true,
                msg: 'Business interactivity incremented'
            });
        })
    });
};


/*
Get function that returns the three most popular businesses based on their interactivity
Calling route: api/business/mostPopular
*/
module.exports.getMostPopular = function(req, res) {
    // query for sorting businesses based on interactivity and limits the result to 3
    const query = Business.find().sort({
        interactivity: -1
    }).limit(3);
    // execute the above query
    query.exec(function(err, businesses) {
        // If there is an error return it in response
        if (err) res.json({
            success: false,
            msg: 'Failed to retrieve most popular businesses'
        });
        // If no error return the list of businesses
        res.json({
            success: true,
            msg: 'Got most popular businesses successfully',
            businesses: businesses
        });
    });
};


/*
  Helper function that takes Business Name and email and sends them
  an email notifying them they were verified
*/
function sendEmailVerified(businessName, businessEmail, done) {
    let mailOptions = {
        from: '"Black Hats Team" <blackhatsguc@gmail.com>', // sender address
        to: businessEmail, // list of receivers
        subject: 'Account Verified', // Subject line
        text: 'Hello ' + businessName + '!\n\nYour acount has been verified.\n\nWelcome to Black Hats' // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            done(error, null);
        }
        done(null, info);
    });
}


/*
  Helper function that takes Business Name and email and sends them
  an email notifying them they were rejected
*/
function sendEmailRejected(businessName, businessEmail, done) {
    let mailOptions = {
        from: '"Black Hats Team" <blackhatsguc@gmail.com>', // sender address
        to: businessEmail, // list of receivers
        subject: 'Account Rejected', // Subject line
        text: 'Hello ' + businessName + '\n\nUnfortunately, your application was rejected.\n\nThank you for considering Black Hats' // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            done(error, null);
        }
        done(null, info);
    });
}

// for testing
// add route in index.js to test with
/*
module.exports.sendEmail = function(req, res) {
    sendEmailRejected('Break Out', 'hassaanelgarem@gmail.com', function(err, info){
        if(err) res.json({success: false, error: err});
        res.json({success: true, info: info});
    });

}
*/
