const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});
//index + create created together
// upload.single("listing[image]")
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),
validateListing, 
wrapAsync(listingController.createListing));
//new listing
router.get("/new",isLoggedIn,listingController.renderNewForm);
//for delete update and show
router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
//edit listing
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));
module.exports=router;