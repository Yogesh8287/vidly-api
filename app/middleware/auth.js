const jwt = require("jsonwebtoken");

const { jwtprivatekey } = process.env;
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied.");

  try {
    const decoded = jwt.verify(token, jwtprivatekey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}
module.exports = auth;
