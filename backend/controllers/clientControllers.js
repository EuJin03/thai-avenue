import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Client from "../models/clientModel.js";

// @desc Generate client or get token
// @route POST /api/client/
// @access Public route
const fetchClient = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  console.log(_id);
  if (_id) {
    const client = await Client.findById(_id);

    if (client) {
      res.json({
        _id: _id,
        token: generateToken(_id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    const newClient = await Client.create({});

    if (newClient) {
      res.status(201).json({
        _id: newClient._id,
        token: generateToken(newClient._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc Get client profile
// @route GET /api/client/profile
// @access Public route
const getClientProfile = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.client.id);

  if (client) {
    res.json({
      _id: client.id,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { fetchClient, getClientProfile };
