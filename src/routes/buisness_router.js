
const buisness_router = require("express").Router();
const { signup, login } = require("../controllers/buisness_controller");

buisness_router.post("/signup", signup);
buisness_router.post("/login", login);


module.exports = {  buisness_router };
