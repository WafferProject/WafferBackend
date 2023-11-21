const { Buisness } = require("../models/Buisness");
const { Offer } = require("../models/Offer");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  console.log("signup request received ");
  const signup_object = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    location: {
      type: "Point",
      coordinates: [req.body.location[0], req.body.location[1]],
    }, //preparing for db insertion of a location of type point
    description: req.body.description,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    tax_registration_number: req.body.tax_registration_number,
  };

  try {
    const inserted_buisness = await Buisness.create(signup_object);
    console.log("Buinsess created:" + inserted_buisness.toJSON());
    console.log("==================");

    return res.status(200).json({
      msg: "Successful insertion:",
      inserted: inserted_buisness.toJSON(),
    });
  } catch (error) {
    console.error("Error creating Buisness:", error);
    return res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  console.log("Received buisness login request");
  const { tax_registration_number, password } = req.body;

  try {
    //check tax rn  and password
    const buisness = await Buisness.findByPk(tax_registration_number);

    if (!buisness || buisness.password !== password) {
      console.log("wrong ps");
      console.log("==================");

      return res.status(401).send("wrong identifier or password");
    }
    // buisness authenticated , generate jwt
    console.log(buisness.toJSON());

    const token = jwt.sign(
      { tax_registration_number: buisness.tax_registration_number },
      process.env.SECRET
    );
    res.cookie("token", token, { httpOnly: true });
    console.log("==================");
    return res.status(200).send("successful login ");
  } catch (error) {
    //db error
    return res.status(500).json({ error: error });
  }
};

const addOffer = async (req, res) => {
  const {
    old_price,
    tax_registration_number,
    new_price,
    category,
    quantity,
    description,
  } = req.body;

  const new_offer = {
    old_price,
    tax_registration_number,
    new_price,
    category,
    quantity,
    description,
  };
  try {
    const inserted_offer = await Offer.create(new_offer);
    console.log("offer created successfully" );
    console.log("==================");
    return res.status(200).json({ msg: "offer inserted successfully", inserted:inserted_offer.toJSON()});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

module.exports = { signup, login , addOffer};
