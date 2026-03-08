import * as userModel from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await userModel.createUser(name, email);
    handleResponse(res, 201, "User Created Successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    handleResponse(res, 201, "Users Fetched Successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User Fetched Successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.updateUser(req.params.id, name, email);
    if (!user) {
      handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User updated Successfully", user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.deleteUser(req.params.id);
    if (!user) {
      handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User deleted Successfully");
  } catch (err) {
    next(err);
  }
};
