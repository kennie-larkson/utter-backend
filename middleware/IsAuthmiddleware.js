import { verifyToken } from "../utils/JWT_HANDLER.js";

const isAuth = async (res, res, next) => {
  const userID = verifyToken(token);
  if (userID.err)
    return res.status(400).json({ status: "failed", message: userID.err });

  return userID;
};

export default isAuth;
