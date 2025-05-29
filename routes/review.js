const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({mergeParams: true});

const Review = require("../Models/reviews.js")
const Listing = require("../Models/listing");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js")





// reviews 
 //post route
router.post("/" ,isLoggedIn,validateReview, wrapAsync( reviewController.post))


// delete review
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.delete))


module.exports = router;