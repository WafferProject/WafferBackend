const { Buisness } = require("../models/Buisness");
const { Offer } = require("../models/Offer");
const jwt = require("jsonwebtoken");
const { WorkPhone } = require("../models/WorkPhone");
const { PlaceOrder } = require("../models/PlaceOrder");

const signup = async (req, res) => {
  console.log("signup request received ");
  const signup_object = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    location: {
      type: "Point",
      coordinates: [req.body.location[0], req.body.location[1]], //lat - long
    }, //preparing for db insertion of a location of type point
    description: req.body.description,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    tax_registration_number: req.body.tax_registration_number,
  };

  try {
    const inserted_buisness = await Buisness.create(signup_object);
    const phonesToObjs = req.body.work_phones.map((phone) => ({
      BuisnessTaxRegistrationNumber: req.body.tax_registration_number,
      phone_number: phone,
    }));
    console.log(phonesToObjs);
    const work_phones = await WorkPhone.bulkCreate(phonesToObjs);

    console.log(
      "Buinsess created:" +
        JSON.stringify(inserted_buisness) +
        "  " +
        JSON.stringify(work_phones)
    );
    console.log("==================");

    return res.status(200).json({
      msg: "Successful insertion , redirect to home ",
      inserted: { inserted_buisness, work_phones },
    });
  } catch (error) {
    console.error("Error creating Buisness:", error);
    return res.status(500).json(error);
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
    res.cookie("token", token);
    console.log("==================");
    return res.status(200).send("successful login ");
  } catch (error) {
    //db error
    console.log(error);

    return res.status(500).json({ error: error });
  }
};

const getBuisnessProfile = async (req, res) => {
  const { tax_registration_number } = req.body;

  try {
    //check tax rn  and password
    const buisness = await Buisness.findByPk(tax_registration_number);

   
    console.log("==================");
    return res.status(200).json({Buisness:buisness});
  } catch (error) {
    //db error
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const updateProfile = async (req, res) => {
  const { tax_registration_number } = req.body;
  try {
    const updated_buisness = await Buisness.update(req.body, {
      //force frontend to exclude update of trn ,email
      where: { tax_registration_number: tax_registration_number },
    });
    console.log(
      "buisness profile updated successfully " +
        JSON.stringify(updated_buisness)
    );
    console.log("=================");
   return  res.status(200).json({
      msg: "buisness profile updated successfully",
    });
  } catch (err) {
    console.log(err);
   return  res.status(500).json({ err: err });
  }
};

const addOffer = async (req, res) => {
  //destructure offer data from request body
  const {
    old_price,
    new_price,
    category,
    quantity,
    description,
    tax_registration_number,
  } = req.body;

  const new_offer = {
    old_price,
    tax_registration_number: tax_registration_number,
    new_price,
    category,
    quantity,
    description,
  };
  try {
    const inserted_offer = await Offer.create(new_offer);
    console.log("offer created successfully");
    console.log("==================");

    return res.status(200).json({
      msg: "offer inserted successfully",
      result: inserted_offer.toJSON(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const updateOffer = async (req, res) => {
  const { tax_registration_number } = req.body;
  try {
    //search for offer
    const offerToUpdate = await Offer.findOne({
      where: { id: req.body.offer_id },
    });
    // no offer match
    if (!offerToUpdate) {
      console.log("no matched offer");
      console.log("==================");

      return res.status(404).json({ msg: "requested offer doesnt exist " });
    }
    //if offer exist  and doesnt belong to the user
    if (offerToUpdate.tax_registration_number !== tax_registration_number) {
      console.log("offer does not belong");
      console.log("==================");

      return res.status(403).json({ msg: "forbidden resource access" });
    }
    //all verified , update the offer
    await offerToUpdate.set(req.body).save();
    console.log("offer updated");
    console.log("==================");

    return res.status(200).json({ msg: "offer updated successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ err });
  }
};

const getPostedOffers = async (req, res) => {
  const { tax_registration_number } = req.body;
  try {
    const posted_offers = await Offer.findAll({
      where: {
        tax_registration_number: tax_registration_number, // Specify the buisness that posted the offer
        status: 1,
      },
      include: PlaceOrder, // retrieve the orders related to the offer
    });
    console.log("return posted offers ");
    console.log("==================");

    return res.status(200).json({ result: posted_offers });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error });
  }
};

const deleteOffer = async (req, res) => {
  const { tax_registration_number } = req.body;
  try {
    //search for offer
    const offerToDelete = await Offer.findOne({
      where: { id: req.body.offer_id },
    });
    // no offer match
    if (!offerToDelete) {
      console.log("no matched offer");
      console.log("==================");

      return res
        .status(404)
        .json({ msg: "requested offer doesnt exist or already deleted " });
    }
    //if offer exist  and doesnt belong to the user
    if (offerToDelete.tax_registration_number !== tax_registration_number) {
      console.log("offer does not belong");
      console.log("==================");

      return res.status(403).json({ msg: "forbidden resource access" });
    }
    //all verified , delete the offer
    await offerToDelete.set({ status: 0 }).save();
    console.log("offer deleted");
    console.log("==================");

    return res.status(200).json({ msg: "offer deleted successfully" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ err });
  }
};

module.exports = {
  signup,
  login,
  addOffer,
  getPostedOffers,
  deleteOffer,
  updateProfile,
  updateOffer,
  getBuisnessProfile
};
