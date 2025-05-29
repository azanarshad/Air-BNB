const Listing = require("../Models/listing");

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
};

module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newlistting = new Listing(req.body.listing);

  newlistting.owner = req.user._id;
  newlistting.image = {
    url: url,
    filename: filename,
  };
  await newlistting.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.edit = async (req, res) => {
  const list = await Listing.findById(req.params.id);
  if (!Listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  let originalImage = list.image.url;
  let secondurl = originalImage.replace("/upload","/upload/h_300,w_250");
  res.render("listings/edit.ejs", { list , secondurl});
};

module.exports.update = async (req, res) => {
  let listing = await Listing.findByIdAndUpdate(req.params.id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {
      url,
      filename,
    };
    await listing.save();
  }

  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};
