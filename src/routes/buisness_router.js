
const buisness_router = require("express").Router();
const { signup, login , addOffer, getPostedOffers, deleteOffer, updateProfile, updateOffer } = require("../controllers/buisness_controller");

buisness_router.post("/signup", signup);
buisness_router.post("/login", login);
buisness_router.post("/offer" , addOffer);
buisness_router.get("/offer",getPostedOffers); //retrieves orders too
buisness_router.delete("/offer" , deleteOffer);
buisness_router.put("/profile" , updateProfile);
buisness_router.put("/offer" , updateOffer);




module.exports = {  buisness_router };
