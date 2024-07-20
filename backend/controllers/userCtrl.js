const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const userController = {
  //user registration
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //Validate
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }
    //Check If User Exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      _id: userCreated._id,
      username: userCreated.username,
      email: userCreated.email,
    });
  }),

  //user login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Validate
    if (!email || !password) {
      throw new Error("Please enter the Credentials.");
    }

    //Check if the email is valid
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Login Credentials");
    }

    //Compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Login Credentials");
    }

    //Generate a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });

    //Send the response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //user profile
  profile: asyncHandler(async (req, res) => {
    //find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //send the response
    res.json({
      email: user.email,
      username: user.username,
    });
  }),

  //Change Password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    //Hash the new Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    //ReSave the user
    await user.save({
      validateBeforeSave: false,
    });

    //send the response
    res.json({
      message: "Password Changed Successfully",
    });
  }),

  //Update User Profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    //send the response
    res.json({
      message: "User Profile Updated Successfully",
      updatedUser,
    });
  }),
};

module.exports = userController;
