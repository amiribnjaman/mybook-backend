const User = require("../model/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();


// Create OR Signup a user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    if (!getuser) {
      const hashPass = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        id: uuidv4(),
        name,
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
    const getuser = await User.findOne({ email: email });
    const hashPass = bcrypt.compareSync(password, getuser.password);
    if (hashPass) {
      // JWT Sign
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN);
      res.send({ status: 200, token, user: getuser });
    } else {
      res.status(401).json({ message: "Email or password is Invalid" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { signupUser, loginUser };
