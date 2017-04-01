const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	comment: {
		type: String
	},
	rating: {
		type: Number,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
    ref: "User",
		required: true
	},
	business: {
		type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
		required: true
	},
	time: {
		type: Date,
		required: true
	}
});

mongoose.model('Review', reviewSchema);
