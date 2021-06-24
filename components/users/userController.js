import User from "./userModel.js";
import asyncHandler from "./../../middleware/asyncHandler.js";

const createUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      message: newUser,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const users = await User.find({})
    .skip(limit * page - limit)
    .limit(limit * 1);

  res.status(200).json({
    status: "success",
    per_page: limit,
    data: { users },
  });
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

export { createUser, getAllUsers, getUser, updateUser };
