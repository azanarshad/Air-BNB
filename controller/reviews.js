const Listing = require("../Models/listing");
const reviews = require("../Models/reviews");

module.exports.post = async (req,res)=>{
    let listing =   await  Listing.findById(req.params.id)
    let newReview = new reviews(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully created a new review!");
    res.redirect(`/listings/${listing._id}`)
}

module.exports.delete = async (req,res)=>{
  let { id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
  await reviews.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/listings/${id}`);
}