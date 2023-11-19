// const router = require("express").Router();
// const dbconfig = require("./config/db_config");
// const jwt = require("jsonwebtoken");


// router.post("/signup", (req, res) => {
//   console.log("signup request received ");

//   const signup_object = [
//     req.body.email,
//     req.body.name,
//     req.body.password,
//     `POINT(${req.body.location[0]} ${req.body.location[1]})`, //preparing for db insertion of a loction point
//     req.body.description,
//     req.body.phone_number,
//     req.body.tax_registration_number,
//   ];

//   dbconfig
//     .insertBuisnessRec(signup_object)
//     .then((result) => {
//       console.log("successful insertion ");
//       const token = jwt.sign({ buisness_id: result.insertId }, secret);
//       res.cookie("token", token, { httpOnly: true });

//       return res
//         .status(200)
//         .send(
//           "Successful insertion of user with id :" +
//             JSON.stringify(result.insertId)
//         );
//     })
//     .catch((err) => {
//       console.log(" error: " + err);

//       return res.status(500).json({ error: "db error " + err });
//     });
// });

// router.post("/login", (req, res) => {
//   console.log("Received buisness login request");
//   const user_token = req.cookies.token;
//   // if user has no token
//   if (!user_token) {
//     const { email, password } = req.body;
//     //check username and password
//     dbconfig
//       .findBuisnessByEmailAndPsswd(email, password)
//       .then((result) => {
//         //no match
//         if (result.length == 0) {
//           console.log("No matching user found");
//           return res.status(404).send("wrong username or password");
//         }

//         //user authenticated , generate session
//         console.log("Authentication successful");
//         console.log(result);
//         const token = jwt.sign({ buisness_id: result[0].buisness_id }, secret);
//         res.cookie("token", token, { httpOnly: true });
//         return res.status(200).send("successful login ");
//       })
//       .catch((err) => {
//         console.error("Database error:", err);
//         return res.status(500).json({ error: "db error " + err });
//       });
//   }
// });

// router.post("/offer",(req,res)=>{



  
// })

// module.exports = router;
