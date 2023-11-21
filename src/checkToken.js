const jwt = require("jsonwebtoken");

// Define the session checking middleware if non valid session end request with code and redirection to login
const checkJwtToken = function (req, res, next) {
  const jwttoken = req.cookies.token;
  //regular expression to check if path is towards login/signup
  const isLoginOrSignup = /\/(login|signup)$/i.test(req.path);



  // If there's no token and the request is for login or signup, let it pass
  if (!jwttoken && isLoginOrSignup) {
    console.log("Passed for login or signup");
    return next();
  }

  // If there's a token, verify it
  if (jwttoken) {
    jwt.verify(jwttoken, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err);
        return res.status(401).json({ error: "Invalid token" });
      }

      // If token is validated and the request is for login or signup, redirect to the home page
      if (isLoginOrSignup) {
        console.log("valid token redicrect ")
        return res
          .status(303)
          .json({msg: "JWT token validated, redirect to the home page", payload: decoded.email});
      }

      // If the token is validated, attach information to the request object for next processing
      req.body.email = decoded.email;
      console.log("Valid token: " + JSON.stringify(decoded));
     return  next(); // All good, call the next handler
    });
  } else {
    // If the user has no token and is requesting anything other than login/signup, interrupt
    return res
      .status(401)
      .send("Invalid JWT token, redirect to login/signup page");
  }
};

module.exports = {checkJwtToken};
