const consumer_router = require("express").Router();
const { signup, login, addOrder } = require("../controllers/consumer_controller");

consumer_router.post("/signup", signup);
consumer_router.post("/login", login);
consumer_router.post("/offer",addOrder);


module.exports = { consumer_router };
