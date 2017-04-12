const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user.controller');
const bookingCtrl = require('../controllers/booking.controller');
const reviewCtrl = require('../controllers/review.controller');
const activityCtrl = require('../controllers/activity.controller');
const businessCtrl = require('../controllers/business.controller');
const profileCtrl = require('../controllers/profile.controller.js');
const advCtrl = require('../controllers/advertisement.controller');
const adminCtrl = require('../controllers/admin.controller');
const imagesCtrl = require("../controllers/images.controller");


module.exports = function(passportConfig) {
    var authenticateUser = passportConfig.passport.authenticate('local-user', {
        successRedirect: '/',
        failureRedirect: '/api/login',
        failureFlash: false
    });


    var authenticateBusiness = passportConfig.passport.authenticate('local-business', {
        successRedirect: '/',
        failureRedirect: '/api/login',
        failureFlash: false
    });


    //Not logged in only routes
    router.route('/user/login').post(passportConfig.isNotLoggedIn, authenticateUser);
    router.route('/business/login').post(passportConfig.isNotLoggedIn, authenticateBusiness);


    //Available to all routes
    router.route('/search').get(userCtrl.searchByNameOrTag, userCtrl.searchByLocationAndCategory);
    router.route('/business/:businessId/interact').put(businessCtrl.updateInteractivity);
    router.route('/business/:businessId/getInfo').get(businessCtrl.getCurrentInfo);
    router.route('/business/mostPopular').get(businessCtrl.getMostPopular);
    router.route('/business/unVerifiedBusinesses').get(businessCtrl.unVerifiedBusinesses);
    router.route('/business/apply').post(businessCtrl.addBusiness);
    router.route('/user/register').post(userCtrl.registerUser);
    router.route('/user/profile/:userId').get(profileCtrl.getOneUser);
    router.route('/review/user/:userId').get(reviewCtrl.getUserReviews);
    router.route('/review/averageRating/:businessId').get(reviewCtrl.getAverageRating);
    router.route('/review/:businessId').get(reviewCtrl.getReviews);
    router.route('/activity/:businessId').get(activityCtrl.getActivities);
    router.route('/booking/history/:userId').get(bookingCtrl.getBookingHistory);
    router.route('/activity/freeSlots').post(activityCtrl.getAvailableSlots);
    router.route('/advertisement/addAdvSlots').post(advCtrl.addAdvSlots);
    router.route('/advertisement/getAdvSlots').get(advCtrl.getAdvSlots);
    router.route('/advertisement/getCurrentBookings/:advSlotId').get(advCtrl.getCurrentBookings);
    router.route('/advertisement/getFreeSlot/:advSlotId').get(advCtrl.getFreeSlot);
    router.route('/image/:imageType/:imageName').get(imagesCtrl.getImage);


    //Available to logged in only routes

    //Business routes
    router.route('/business/addTags').put(passportConfig.isBusinessLoggedIn, businessCtrl.addTags);
    router.route('/business/addCategory').put(passportConfig.isBusinessLoggedIn, businessCtrl.addCategory);
    router.route('/business/editInfo').put(passportConfig.isBusinessLoggedIn, businessCtrl.saveNewInfo);
    router.route('/business/addPhoto').post(passportConfig.isBusinessLoggedIn, businessCtrl.addPhoto);
    router.route('/business/deletePhoto/:photoPath').delete(passportConfig.isBusinessLoggedIn, businessCtrl.deletePhoto);
    router.route('/business/addLogo').post(passportConfig.isBusinessLoggedIn, businessCtrl.uploadLogo);
    router.route('/business/logout').get(passportConfig.isBusinessLoggedIn, passportConfig.logout);
    //Business activity routes
    router.route('/activity/add').post(passportConfig.isBusinessLoggedIn, activityCtrl.addActivity);
    router.route('/activity/:activityId/addSlot').post(passportConfig.isBusinessLoggedIn, activityCtrl.addSlot);
    router.route('/activity/:activityId/deleteSlot').delete(passportConfig.isBusinessLoggedIn, activityCtrl.deleteSlot);
    router.route('/activity/:activityId/addPhoto').post(passportConfig.isBusinessLoggedIn, activityCtrl.addPhoto);
    router.route('/activity/:activityId/deletePhoto/:photoPath').delete(passportConfig.isBusinessLoggedIn, activityCtrl.deletePhoto);


    //Admin routes
    router.route('/admin/verify/:businessId').put(passportConfig.isAdminLoggedIn, adminCtrl.verifyBusiness);
    router.route('/admin/delete/:businessId').delete(passportConfig.isAdminLoggedIn, adminCtrl.deleteBusiness);


    //User routes
    router.route('/user/logout').get(passportConfig.isUserLoggedIn, passportConfig.logout);
    router.route('/user/profile/editInfo').put(passportConfig.isUserLoggedIn, profileCtrl.updateOneUser);
    router.route('/user/profile/uploadProfilePicture').post(passportConfig.isUserLoggedIn, profileCtrl.uploadProfilePicture);
    router.route('/user/deleteAccount').delete(passportConfig.isUserLoggedIn, userCtrl.deleteAccount);
    router.route('/user/addFavorite/:businessId').put(passportConfig.isUserLoggedIn, userCtrl.addFavorite);
    router.route('/activity/book').post(passportConfig.isUserLoggedIn, bookingCtrl.bookActivity);
    router.route('/activity/deleteBooking/:bookingId').delete(passportConfig.isUserLoggedIn, bookingCtrl.deleteBooking);
    //User review routes
    router.route('/review/:businessId/add').post(passportConfig.isUserLoggedIn, reviewCtrl.addReview);
    router.route('/review/:reviewId/edit').put(passportConfig.isUserLoggedIn, reviewCtrl.editReview);
    router.route('/review/:reviewId/delete').delete(passportConfig.isUserLoggedIn, reviewCtrl.deleteReview);


    //Advertisement routes
    router.route('/advertisement/bookAdvSlot/:advSlotId').post(passportConfig.isBusinessLoggedIn, advCtrl.bookAdvSlot);


    return router;
};
