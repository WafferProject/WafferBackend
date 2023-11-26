const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const { connect_db } = require("./src/config/db_config");
const { consumer_router } = require("./src/routes/consumer_router");
const { buisness_router } = require("./src/routes/buisness_router");
const { checkJwtToken } = require("./src/checkToken");
const cors = require("cors");

const port = process.env.PORT;
connect_db();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's address
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//every request passes by the check Token to validate authentiation
app.use(checkJwtToken);
app.use("/api/consumer/", consumer_router);
app.use("/api/buisness", buisness_router);

app.all("/api", (req, res) => {
  res.send("hello , homepage");
});

const server = app.listen(port, () => {
  console.log("listening on " + port);
});
