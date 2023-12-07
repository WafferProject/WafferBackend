const { Consumer } = require("../models/Consumer");
const jwt = require("jsonwebtoken");
const { PlaceOrder } = require("../models/PlaceOrder");
const { Offer } = require("../models/Offer");
const { sequelize, QueryTypes } = require("../config/db_config");
const { Buisness } = require("../models/Buisness");
const { WorkPhone } = require("../models/WorkPhone");

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
    console.log("==================");

    return res.status(200).json({
      msg: "Successful insertion , redirect to home ",
      result: inserted_consumer.toJSON(),
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

    const token = jwt.sign({ email: consumer.email }, process.env.SECRET);

    res.cookie("token", token);
    console.log("==================");

    return res.status(200).send("successful login ");
  } catch (error) {
    //db error
    return res.status(500).json({ error: error });
  }
};

const updateProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const updated_consumer = await Consumer.update(req.body, {
      //force frontend to exclude update of email ,
      where: { email: email },
    });
    console.log(
      "consumer profile updated successfully " +
        JSON.stringify(updated_consumer)
    );
    console.log("=================");
    return res.status(200).json({
      msg: "consumer profile updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
};

const addOrder = async (req, res) => {
  try {
    const ordered_offer = await Offer.findOne({
      where: { id: req.body.offer_id, status: 1 },
    });
    if (!ordered_offer) {
      return res.status(404).json({
        msg: "offer not found , it may be deleted or expired",
      });
    }
    if (ordered_offer.dataValues.quantity < req.body.quantity) {
      //if ordered quantity is bigger  then what's available
      return res.status(404).json({
        msg: "not enough remaining quantity",
      });
    }

    const new_order = {
      quantity: req.body.quantity,
      consumer_email: req.body.email,
      offer_id: req.body.offer_id,
      tax_registration_number: req.body.tax_registration_number,
    };

    const inserted_order = await PlaceOrder.create(new_order);
    await sequelize.query("CALL UpdateProductStatus(:id, :decrementAmount)", {
      replacements: {
        id: req.body.offer_id,
        decrementAmount: req.body.quantity,
      },
    });

    console.log(
      "order added successfully and quantity minused " +
        JSON.stringify({ inserted_order, ordered_offer })
    );

    console.log("==================");
    return res.status(200).json({
      msg: " order placed successfully and offer updated",
      result: inserted_order.toJSON(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getOrders = async (req, res) => {
  const { email } = req.body;
  try {
    const orders = await PlaceOrder.findAll({
      where: { consumer_email: email },
      include: Consumer,
    });
    return res.status(200).json({ msg: "orders retrieved", result: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const getOffers = async (req, res) => {
  try {
    let filterCriteria = { include:[{ model: Buisness,
      include: WorkPhone,
      attributes: [ 'email', 'location', 'name', 'opening_time', 'closing_time', 'description']}]};

    // Check if a category is specified in the query
    if (req.query.category) {
      console.log(req.query.category);
      filterCriteria.where = { category: req.query.category };
    }

    // Check if orderby parameter is specified in the query
    if (req.query.date || req.query.price) {
      let orderColumn;

      // Handle orderby parameter (date, distance, or price)
      if (req.query.date) {
        orderColumn = "creation_date";
      } else if (req.query.price) {
        orderColumn = "new_price";
      }

      // Determine the order direction based on the value (1 means ASC, 0 means DESC)
      const orderDirection =
        (req.query.date || req.query.price) == 1 ? "ASC" : "DESC";

      // Add order criteria to filter
      filterCriteria.order = [[orderColumn, orderDirection]];
    }

    // Fetch products based on filter criteria
    const offers = await Offer.findAll(filterCriteria );
    console.log("offers retrieved success");
    console.log("==============");
    console.log(offers);
    return res.status(200).json({ offers });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  signup,
  login,
  addOrder,
  updateProfile,
  getOffers,
  getOrders,
};
