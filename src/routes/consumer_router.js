const consumer_router = require("express").Router();
const { signup, login } = require("../controllers/consumer_controller");

consumer_router.post("/signup", signup);
consumer_router.post("/login", login);


module.exports = { consumer_router };
