import User from "../models/userModel.js";
import Message from "../models/chatModel.js";

// get signuped users
export const getUsers = async (req, res) => {
  try {
    //  get user id
    const loginUserId = req.userId;

    if (!loginUserId) {
      return res
        .status(400)
        .json({ success: false, message: "User id not found" });
    }

    // get the other users
    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );

    if (!filteredUsers) {
      return res
        .status(400)
        .json({ success: false, message: "Users not found" });
    }

    return res.status(200).json({ success: true, filteredUsers });
  } catch (err) {
    console.error(err);
  }
};

// get messages
export const getMessage = async (req, res) => {
  try {
    const { id: reciveUserId } = req.params;

    const sendUserId = req.userId;

    if (!sendUserId || !reciveUserId) {
      return res
        .status(400)
        .json({ success: false, message: "User ids not found" });
    }

    const message = await Message.find({
      $or: [
        { recviedId: sendUserId, senderId: reciveUserId },
        { recviedId: reciveUserId, senderId: sendUserId },
      ],
    });

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message not found" });
    }

    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.error(err);
  }
};

// send messages
export const sendMessage = async (req, res) => {
  try {
    const { id: reciveUserId } = req.params;

    const sendUserId = req.userId;

    if (!sendUserId || !reciveUserId) {
      return res
        .status(400)
        .json({ success: false, message: "User ids not found" });
    }

    const { text, image } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "message is required" });
    }

    // store the image in cloudinary
    let imageURL;

    if (image) {
      imageURL = "dshcbasd";
    }

    const newMessage = new Message({
      senderId: sendUserId,
      recviedId: reciveUserId,
      text,
      image: imageURL,
    });

    await newMessage.save();

    return res.status(200).json({ success: true, message: newMessage });
  } catch (err) {
    console.error(err);
  }
};
