
const buisness_router = require("express").Router();
const { signup, login , addOffer } = require("../controllers/buisness_controller");

buisness_router.post("/signup", signup);
buisness_router.post("/login", login);
buisness_router.post("/offer" , addOffer);


module.exports = {  buisness_router };
