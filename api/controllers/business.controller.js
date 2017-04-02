const mongoose = require("mongoose");
const Business = mongoose.model("Business");


// for testing
/*
module.exports.add = function(req, res){
    const newBusiness = new Business({name: "test4", email: "test4", password: "test4", description: "test4"});
    newBusiness.save(function (err, business) {
      if (err) return res.json({success: false, msg: 'adding failed'});
      res.json({success: true, msg: 'added'});
    });
};
*/



// Post function that increments the interactivity attribute of a certain business by 1
// URI: api/business/interact/:id
module.exports.updateInteractivity = function (req, res) {
  Business.findById(req.params.id, function (err, business) {
    business.interactivity = business.interactivity + 1;
    business.save(function (err) {
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


// Get function that returns the three most popular businesses based on their interactivity
// URI: api/business/mostPopular
module.exports.getMostPopular = function (req, res) {
  const query = Business.find().sort({
    interactivity: -1
  }).limit(3);
  query.exec(function (err, businesses) {
    if (err) res.json({
      success: false,
      msg: 'Failed to retrieve most popular businesses'
    });
    res.json({
      success: true,
      msg: 'Got most popular businesses successfully',
      businesses: businesses
    });
  });
};


/* Multer configuration to upload a single file from an
html input with name "myfile" to public/uploads folder*/
const upload = multer({
  dest: path.join(__dirname, '../', '../public/uploads')
}).single('myfile');


/* 
Upload Logo using multer 
and store the uploaded image path in the Business 
model in photos array, and return the 
filepath to the frontend to show the image.
Calling route: '/business/:businessId/addLogo'
*/
module.exports.uploadLogo = function (req, res) {
  //Check if logged in
  if (req.user) {
    //upload the image
    upload(req, res, function (err) {
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
        var newPath = path.join(__dirname, "../", "../public/uploads/businessLogos/img" + Date.now() + "." + string);
        fs.renameSync(req.file.path, newPath, function (err) {
          if (err) throw err;

          //delete the image with the old name
          fs.unlink(req.file.path);
        });

        //save the image file path to the Business model
        Business.findById(req.params.businessId, function (err, user) {
          business.logo = newPath;
          business.save(function (err) {
            //couldn't save, return the error
            if (err) {
              res.json(err);
            } else {
              //return the file path to the frontend to show the image
              res.json(newPath);
            }
          });
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