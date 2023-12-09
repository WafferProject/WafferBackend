const consumer_router = require("express").Router();
const { signup, login, addOrder, getOffers, updateProfile, getOrders } = require("../controllers/consumer_controller");

consumer_router.post("/signup", signup);
consumer_router.post("/login", login);
consumer_router.post("/order",addOrder);
consumer_router.get("/offer",getOffers); // with or without filters 
consumer_router.put("/profile",updateProfile);
consumer_router.get("/order",getOrders); 



module.exports = { consumer_router };
