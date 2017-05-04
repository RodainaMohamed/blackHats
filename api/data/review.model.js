const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema( {
	comment: {
		type: String,
		required: true
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
	//yyyy-MM-ddTHH:mm:ssZ
	time: {
		type: Date,
		default: Date.now
	}
});

reviewSchema.pre('remove', function(next){
	var review = this;
	review.model('Business').update(
        { _id: review.business},
        { $pull: { reviews: review._id } },
        { multi: true },
        next
     );
});

reviewSchema.pre('remove', function(next){
	var review = this;
	review.model('User').update(
        { _id: review.user},
        { $pull: { reviews: review._id } },
        { multi: true },
        next
     );
});

mongoose.model('Review', reviewSchema);
