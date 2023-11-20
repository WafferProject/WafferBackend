const { Consumer } = require("../models/Consumer");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  console.log("signup request received ");
  // destructure request fields
  const signup_object = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    occupation: req.body.occupation,
    password: req.body.password,
  };

  try {
    const inserted_consumer = await Consumer.create(signup_object);
    console.log("Consumer created:", inserted_consumer.dataValues);
    console.log("==================")

    return res.status(200).json({
      msg: "Successful insertion:",
      inserted: inserted_consumer.toJSON(),
    });
  } catch (error) {
    console.error("Error creating consumer:", error.errors);
    //send only relevant erros msg
    return res.status(500).json({ error: error.errors });
  }
};



const login = async (req, res) => {
  console.log("Received login request");

  //login handles only requests with no token

  const { email, password } = req.body;
  try {
    //check username and password
    const consumer = await Consumer.findByPk(email);
    //no match or wrong psswd
    if (!consumer || consumer.password !== password) {
      return res.status(401).send("wrong username or password");
    }

    // user authenticated , generate jwt
    console.log(consumer.toJSON());

    const token = jwt.sign({email : consumer.email}, process.env.SECRET);

    res.cookie("token", token, { httpOnly: true,  sameSite: 'None', domain: 'localhost:8080', path: '/' });
    console.log("==================")

    return res.status(200).send("successful login ");
  } catch (error) {
    //db error
    return res.status(500).json({ error: error });
  }
};

module.exports = { signup, login };
