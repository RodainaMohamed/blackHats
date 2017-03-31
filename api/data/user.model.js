const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

function toLower (str) 
{
    return str.toLowerCase();
}
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
  lastName: {
    type: String,
    required: true
  },
	email: {
		type: String,
		required: true,
    set: toLower,
    unique: true
	},
	username: {
		type: String,
		required: true,
    set: toLower,
    unique: true
	},
	password: {
		type: String,
		required: true
	},
	profilePicture:{
		type: String
	},
  birthDate: {
    type: Date
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business"
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  }],
  resetPasswordToken : String,
  resetPasswordTokenExpiry : Date
});

module.exports.createUser = function(newUser, callback)
{
	bcrypt.genSalt(10, function(err, salt) 
    {
	    bcrypt.hash(newUser.password, salt, function(err, hash) 
        {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
var User = module.exports = mongoose.model('User', userSchema);
