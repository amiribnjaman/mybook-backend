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
  const { fullName, email, password, imgUrl } = req.body;
  console.log(fullName, email, password, imgUrl);
  // return
  try {
    const getuser = await User.findOne({ email: email });
    if (!getuser) {
      const hashPass = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        id: uuidv4(),
        fullName,
        email,
        password: hashPass,
        imgUrl,
      });
      await newUser.save();
      res.send({ status: "201", user: newUser });
    } else {
      res.send({ status: "400", message: "User already registered" });
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password);
  try {
    const getuser = await User.findOne({ email: email });
    if (getuser) {
      const comparePass = bcrypt.compareSync(password, getuser.password);
      if (comparePass) {
        // JWT Sign
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN);
        // res.cookie("Token", token, { httpOnly: false });
        res.send({
          status: "200",
          token,
          userId: getuser.id,
          userName: getuser.fullName,
          userImg: getuser.imgUrl,
          message: "Logedin successfully!",
        });
      } else {
        res.send({ status: "401", message: "Email or password is Invalid" });
      }
    } else {
      res.send({ status: "404", message: "User not found!" });
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};

// GET A SINGLE USER API
const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const getuser = await User.findOne({ id: userId });
    if (getuser) {
      res.send({
        status: "200",
        user: getuser,
      });
    } else {
      res.send({ status: "404", message: "User not found!" });
    }
  } catch (error) {
    res.send({ status: "500", error });
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
  console.log("ok");
  const { userId, type, postId } = req.body;
  try {
    const post = await Post.findOne({ id: postId });
    const postUser = await User.findOne({ id: post.userId });
    const user = await User.findOne({ id: userId });
    const findUser = postUser?.notification?.find(
      (like) => like?.userId == user?.id
    );
    const likeNotification = postUser?.notification?.find(
      (notification) =>
        notification?.postId == postId && notification.like == true
    );

    if (type === "like") {
      // LIKE NOTIFICATION
      if (!likeNotification) {
        await User.updateOne(
          { id: post.userId },
          {
            $set: {
              notification: [
                ...postUser?.notification,
                {
                  id: uuidv4(),
                  postId: postId,
                  userId: user.id,
                  like: true,
                  read: false,
                  count: 1,
                },
              ],
            },
          }
        );
        res.send({
          status: "200",
          message: "Notification updated",
        });
      } else {
        await User.updateOne(
          {
            id: post.userId,
            "notification.postId": postId,
            "notification.like": true,
          },
          {
            $set: {
              "notification.$.count": likeNotification.count + 1,
            },
          }
        );
        res.send({
          status: "200",
          message: "Notification updated",
        });
      }
    } else if (type === "comment") {
      const commentNotification = postUser?.notification?.find(
        (notification) =>
          notification?.postId == postId && notification.comment == true
      );

      if (!commentNotification) {
        await User.updateOne(
          { id: post.userId },
          {
            $set: {
              notification: [
                ...postUser?.notification,
                {
                  id: uuidv4(),
                  postId: postId,
                  userId: user.id,
                  comment: true,
                  read: false,
                  count: 1,
                },
              ],
            },
          }
        );

        res.send({
          status: "200",
          message: "Notification updated",
        });
      } else {
        await User.updateOne(
          {
            id: post.userId,
            "notification.postId": postId,
            "notification.comment": true,
          },
          {
            $set: {
              "notification.$.count": commentNotification.count + 1,
            },
          }
        );
        res.send({
          status: "200",
          message: "Notification updated",
        });
      }
    } else {
      res.send({ status: "401", message: "Something went wrong" });
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

{
  /*
   ** READ NOTIFICATION FOR A SPECIFIC USER
   */
}
const readNotification = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({ id: userId });
  const unRead = user?.notification?.filter(
    (notification) => notification.read == false
  );
  try {
    if (userId && unRead?.length > 0) {
      await User.updateOne(
        { id: userId, "notification.read": false },
        {
          $set: {
            "notification.$.read": true,
          },
        }
      );
      const data = await User.findOne({ id: userId });
      res.send({ status: "200", data, message: "Notification updated." });
    } else {
      res.json({ status: "404", message: "All notificatin already read." });
    }
  } catch (error) {
    res.status(401).json({ status: "401", message: error });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getSingleUser,
  forgotPassCheck,
  resetPassword,
  createNotification,
  getNotification,
  readNotification,
};
