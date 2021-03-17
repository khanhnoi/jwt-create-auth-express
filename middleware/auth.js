const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //   console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decoded");
    // console.log(decoded);
    //     decoded
    // { id: 2, userName: 'khanhnoi', iat: 1615981860 }
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
