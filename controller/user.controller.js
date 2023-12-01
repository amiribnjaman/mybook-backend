const User = require("../model/user.model");
const Post = require("../model/post.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Create OR Signup a user
const signupUser = async (req, res) => {
  const { firstName, surName, email, password } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    if (!getuser) {
      const hashPass = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        id: uuidv4(),
        firstName,
        surName,
        email,
        password: hashPass,
        notification: [],
      });
      await newUser.save();
      res.send({ status: '201', user: newUser });
    } else {
      res.send({ status: '400', message: "User already registered" });
    }
  } catch (error) {
    res.send({status: 500, error});
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    const comparePass = bcrypt.compareSync(password, getuser.password);
    if (comparePass) {
      // JWT Sign
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN);
      // res.cookie("Token", token, { httpOnly: false });
      res.send({
        status: '200',
        token,
        userId: getuser.id,
        message: "Logedin successfully!",
      });
    } else {
      res
        .send({ status: "401", message: "Email or password is Invalid" });
    }
  } catch (error) {
    res.send({status: '500', error});
  }
};

{
  /*
   ** Here first get user email and checking
   ** then if metched operate reset password api
   ** For reset password
   */
}
// Forgot password email check
const forgotPassCheck = async (req, res) => {
  const { email } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    if (getuser) {
      res.json({
        status: "200",
        message: "Email matched. Now set new password!",
      });
    } else {
      res.status(401).json({ status: "401", message: "Email is Invalid" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Reset Password
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    if (getuser) {
      const hashPass = bcrypt.hashSync(password, saltRounds);
      const updateData = await User.updateOne(
        { email: email },
        {
          $set: {
            password: hashPass,
          },
        }
      );
      res.json({
        status: "201",
        data: updateData,
        message: "Password reset. Login now.",
      });
    } else {
      res.status(401).json({ status: "401", message: "Email is Invalid" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

{
  /*
   ** CREATE USER NOTIFICATION
   */
}
const createNotification = async (req, res) => {
  const { userId, type, postId } = req.body;
  try {
    const post = await Post.findOne({ id: postId });
    const postUser = await User.findOne({ id: post.userId });
    const likeUser = await User.findOne({ id: userId });
    const findUser = postUser?.notification?.find(
      (like) => like?.userId == likeUser?.id
    );

    if (!findUser?.like && findUser?.postId != postId && type == "like") {
      await User.updateOne(
        { id: post.userId },
        {
          $set: {
            notification: [
              ...postUser?.notification,
              {
                id: uuidv4(),
                postId: postId,
                userId: likeUser.id,
                like: true,
                read: false,
              },
            ],
          },
        }
      );
      res.json({
        status: "200",
        message: "Notification updated",
      });
    } else if (
      !findUser.comment &&
      findUser?.postId != postId &&
      type == "comment"
    ) {
      await User.updateOne(
        { id: post.userId },
        {
          $set: {
            notification: [
              ...postUser?.notification,
              {
                id: uuidv4(),
                postId: postId,
                userId: likeUser.id,
                comment: true,
                read: false,
              },
            ],
          },
        }
      );

      res.json({
        status: "200",
        message: "Notification updated",
      });
    } else {
      res.json({ status: "401", message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

{
  /*
   ** GET NOTIFICATION FOR A SPECIFIC USER
   */
}
const getNotification = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    if (userId) {
      const notification = await User.find(
        { id: userId },
        { notification: 1, _id: -1 }
      );
      res.json({
        status: "200",
        data: notification,
        message: "Notification send",
      });
    } else {
      res.json({ status: "401", message: "Email or password is Invalid" });
    }
  } catch (error) {
    res.status(401).json({ status: "401", message: error });
  }
};

module.exports = {
  signupUser,
  loginUser,
  forgotPassCheck,
  resetPassword,
  createNotification,
  getNotification,
};
