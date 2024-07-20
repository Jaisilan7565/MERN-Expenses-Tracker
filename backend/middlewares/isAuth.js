const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  //Get token from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  //Verify the token
  const verifyToken = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });

  if (verifyToken) {
    // save the user request Object
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token Expired, Login Again");
    next(err);
  }
};

module.exports = isAuthenticated;
