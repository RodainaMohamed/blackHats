const mongoose = require('mongoose');
const User = mongoose.model('User');
const Business = mongoose.model('Business');
const Review = mongoose.model('Review');


/* Get function that retrieves the reviews made by a user from the database
and displays them
Returns: {
  error: "Error object if any"
  msg: "Success or failure message"
}
Redirects to: Nothing
Calling route: /api/review/user/:userId */
module.exports.getUserReviews = function (req, res) {
    //Finds all reviews made by a user according to the User ID
    Review.find({
        "user": req.params.userId
    }, function (err, reviews) {
        //If an error occurred, return an error
        if (err) {
            res.status(500).json({
              error: err,
              msg: "Error retrieving desired reviews",
              data: null
            });
        } else {
            //returns an array of reviews or empty array
            res.status(200).json({
                error: null,
                msg: "Reviews retrieved Successfully",
                data: reviews
            });
        }
    })
};


/* Post function that adds a review by a registered user on a business
to the database
Body: {
  comment: "Comment that will be added in the review body"
  rating: "1 being the lowest and 5 being the highest"
}
Returns: {
  error: "Error object if any"
  msg: "Success or failure message"
}
Redirects to: Nothing
Calling route: /api/review/businessId/add */
module.exports.addReview = function (req, res) {
    //get values from post request
    var comment = req.body.comment;
    var rating = req.body.rating;
    var user = req.user._id;
    var business = req.params.businessId;

    //Validating entries
    req.checkBody('rating', 'Rating is required.').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(500).json({
          error: err,
          msg: null,
          data: null
        });
    } else {
        //creates a new Review object with the values from the post request
        const newReview = new Review({
            comment: comment,
            rating: rating,
            user: user,
            business: business
        });
        //saves the new review in the database
        newReview.save(function (err, review) {
            //if an error occurred, return an error
            if (err) return res.status(500).json({
                error: err,
                msg: 'There was a problem adding the information to the database',
                data: null
            });
            //Adds review to reviews array of corresponding user
            User.findByIdAndUpdate(
                review.user, {
                    $push: {
                        "reviews": review._id
                    }
                }, {
                    safe: true,
                    upsert: true,
                    new: true
                },
                function (err, model) {
                    if (err) return res.status(201).json({
                        error: err,
                        msg: "Error occured while updating User concerned",
                        data: null
                    });
                    // Gets the business being reviewed
                    Business.findById(review.business, function (err, doc) {
                        if (err) return res.status(201).json({
                          error: err,
                          msg: "Error occured while updating Business concerned",
                          data: null
                        });

                        // Updates totalRating of the business
                        doc.totalRatings = doc.totalRatings + review.rating;

                        //Adds review to reviews array of corresponding business
                        doc.reviews.push(review._id);

                        // Saves the updated business document in database
                        doc.save(function (err) {
                            if (err) return res.status(400).json({
                                error: err,
                                msg: "Error occured while saving review",
                                data: null
                            });
                            res.status(200).json({
                                error: null,
                                msg: "Review saved Successfully",
                                data: null
                            });
                        });
                    });
                });
        });
    }
};


/* Get function that retrieves the reviews made on a Business from the database
Returns: {
  error: "Error object if any",
  msg: "Success or failure message"
}
Redirects to: Nothing
Calling route: /api/review/:businessId */
module.exports.getReviews = function (req, res) {
    //Finds all reviews made on a specific business according to its business ID
    Review.find({
        "business": req.params.businessId
    }, function (err, reviews) {
        //If an error occurred, return an error
        if (err) {
            res.status(500).json({
              error: err,
              msg: "Error retrieving desired reviews",
              data: null
            });
        } else {
            //returns an array of reviews or empty array
            res.status(200).json({
              error: null,
              msg: "Reviews retrieved Successfully",
              data: reviews

            });
        }
    });
}


/*
Get function that returns the average rating of a business
Takes as a parameter the business ID in the route
Returns: {
  error: "Error object if any"
  msg: "success or failure message"
}
Redirects to: Nothing
Calling route: /api/review/averageRating/:businessId
*/
module.exports.getAverageRating = function (req, res) {

    // Get the business concered from the database by it's Id
    Business.findById(req.params.businessId, function (err, doc) {

        // If there is an error return it in response
        if (err) return res.status(404).json({
            error:err,
            msg: "Business Not found",
            data: null
        });
        if (doc) {

            // Calculate average rating using totalRating and count of reviews
            const reviewsCount = doc.reviews.length;
            let averageRating = doc.totalRatings / reviewsCount;

            // Return average rating in response
            res.status(200).json({
                error: null,
                msg: "Successfully calculated average rating",
                data: averageRating
            });
        } else
            res.status(500).json({
                success: false,
                msg: "Error retrieving business",
                data: null
            });
    });
};


/*
Put function that handles editing an existing review
It retrieves the review from the database, updates it
and saves it back in the database
Body: {
  newComment: "The new comment as specified by the user"
  newRating: "The new rating as specified by the user"
}
Returns: {
  error: "Error object if any"
  msg: "Success or failure message"
}
Redirects to: Nothing
Calling route: /api/review/:reviewId/edit
*/
module.exports.editReview = function (req, res) {
    //gets values of variables that user wants to edit
    const newComment = req.body.comment;
    const newRating = req.body.rating;

    //Validating entries
    req.checkBody('rating', 'Rating is required.').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(500).json({
            errors: errors,
            msg: null,
            data: null
        });
    } else {
        //Finds the review by the ID specified in the URI and updates the comment and the rating
        Review.findByIdAndUpdate(
            req.params.reviewId, {
                "comment": newComment,
                "rating": newRating
            }, {
                safe: true,
                new: true
            },
            function (err, editedReview) {
                //If error occurred return it in response
                if (err) return res.status(201).json({
                    error: err,
                    msg: 'Failed to edit review',
                    data: null
                });
                //If no error occurs, response with success = true
                res.status(200).json({
                    error: err,
                    msg: 'Review successfully edited',
                    data: null
                });
            });
    }
};


/* Delete function that finds and deletes a specific review
Returns: {
  error: "Error object if any"
  msg: "success or failure message"
}
Redirects to: Nothing
Calling route: /api/review/:reviewId/delete */
module.exports.deleteReview = function (req, res) {
    //Finding and deleting review from database
    Review.findByIdAndRemove(req.params.reviewId, function (err, reviewToDelete) {
        if (err) return res.status(500).json({
            error: err,
            msg: 'There was a problem with deleting the review',
            data: null
        });
        if (reviewToDelete) {

            //Delete review from reviews array in corresponding user
            User.findByIdAndUpdate(reviewToDelete.user, {
                    $pull: {
                        "reviews": reviewToDelete._id
                    }
                }, {
                    safe: true,
                    upsert: true,
                    new: true
                },
                function (err, model) {
                    if (err) return res.status(201).json({
                        error: err,
                        msg: "Error occured while updating User concerned",
                        data: null
                    });
                    //Delete review from reviews array in corresponding business
                    Business.findByIdAndUpdate(reviewToDelete.business, {
                            $pull: {
                                "reviews": reviewToDelete._id
                            }
                        }, {
                            safe: true,
                            upsert: true,
                            new: true
                        },
                        function(err, data) {
                          if (err) return res.status(201).json({
                            error: err,
                            msg: "Error occured while updating Business concerned",
                            data: null
                          });
                            res.status(200).json({
                                error: null,
                                msg: 'Review successfully deleted',
                                data: null
                            });
                        });
                });
        } else
            res.status(404).json({
                error: null,
                msg: "review not found",
                data: null
            })
    });
};
