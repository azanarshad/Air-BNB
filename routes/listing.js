const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const Listing = require("../Models/listing");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });



router.get("/search",wrapAsync( async (req, res) => {
  function normalizeString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
  }
  let array =  await Listing.find({})
  const { search } = req.query;
  let searched = array.filter((list)=>normalizeString(list.title ) ==normalizeString(search)  || normalizeString(list.location ) == normalizeString(search) || normalizeString(list.country ) ==normalizeString(search));
  if (!searched.length) {
    req.flash("error", "No listings found for your search.");
    return res.redirect("/listings");
  }
  res.render("listings/search.ejs",{searched});
})) ;


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.create)
  );



// new
router.get("/new", isLoggedIn, listingController.new);

router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.update)
  )
  .delete(isOwner, isLoggedIn, wrapAsync(listingController.delete));



//edit
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingController.edit));

module.exports = router;
