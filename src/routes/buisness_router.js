
const buisness_router = require("express").Router();
const { signup, login , addOffer, getPostedOffers, deleteOffer } = require("../controllers/buisness_controller");

buisness_router.post("/signup", signup);
buisness_router.post("/login", login);
buisness_router.post("/offer" , addOffer);
buisness_router.get("/offer",getPostedOffers);
buisness_router.delete("/offer/:o" , deleteOffer);


module.exports = {  buisness_router };
