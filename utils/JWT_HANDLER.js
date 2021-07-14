import jwt from "jsonwebtoken";

export const createToken = (value) => {
  let token = jwt.sign({ user: value }, process.env.SESSION_SECRET, {
    expiresIn: "48h",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.SESSION_SECRET);
    return decoded.user;
  } catch (err) {
    return { err: err.message };
  }
};
