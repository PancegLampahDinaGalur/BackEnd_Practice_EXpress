const { createToken, verifyToken } = require("../helpers/jwt");
const UserModel = require("../models/users");
const users = new UserModel();

async function authorize(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) return res.status(401).json({ message: "Unautorized" });
    const token = bearerToken.split(" ")[1]; // Bearer {token}
    const payload = verifyToken(token);

    req.user = await users.getById(payload.id);
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function checkRole(roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

module.exports = {
  authorize,
  checkRole,
};
