const User = require("../model/user.model");
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
      });
      await newUser.save();
      res.send({ status: 201, user: newUser });
    } else {
      res.send({ status: 400, message: "User already registered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("enter");
    const getuser = await User.findOne({ email: email });
    // const hashPass = bcrypt.hashSync(password, saltRounds);
    const comparePass = bcrypt.compareSync(password, getuser.password);
    if (comparePass) {
      // JWT Sign
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN);
      res.cookie("Token", token, { httpOnly: false });
      res.send({
        status: 200,
        userId: getuser.id,
        message: "Logedin successfully!",
      });
    } else {
      res.status(401).json({status: '401', message: "Email or password is Invalid" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Forgot password email check
const forgotPassCheck = async (req, res) => {
const { email } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    if (getuser) {
      res.json({status: '200', message: "Email matched. Now set new password!" });
    } else {
      res.status(401).json({status: '401', message: "Email is Invalid" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}


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




module.exports = { signupUser, loginUser, forgotPassCheck, resetPassword };
