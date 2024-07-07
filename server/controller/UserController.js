const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res
        .status(409)
        .json({ errorMessage: "User already exists please login " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    await userData.save();
    res.json({
      message: "Successfully registered please login to your account ",
    });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: "something went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "Bad Request! Invalid credentials",
      });
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Wrong password please check" });
    }

    const token = jwt.sign(
      {
        userId: userDetails._id,
        email: userDetails.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.json({
      message: "User logged in",
      token: token,
      email: userDetails.email,
      name: userDetails.name,
      userId: userDetails._id,
      password: userDetails.password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
  }
};

const addEmails = async (req, res) => {
  try {
    const { email, userId } = req.body;
    if (!email) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { registeredEmail: { regEmail: email } } }
    );
    res.json({ message: "Successfully registered" });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: "something went wrong" });
  }
};

const getUserDetailsById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userDetails = await User.findById({ _id: userId });

    if (!userDetails) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    res.json({ data: userDetails });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: "something went wrong" });
  }
};

const updateUserDetailsById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDetails = await User.findById({ _id: userId });

    if (!userDetails) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }
    const {
      updatedName,
      updatedEmail,
      oldPassword,
      newPassword,
      updatePassword,
    } = req.body;

    if (updatePassword === "true") {
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ errorMessage: "Wrong password please check" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            password: hashedNewPassword,
          },
        }
      );
    } else {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name: updatedName,
            email: updatedEmail,
          },
        }
      );
    }

    res.json({ message: "UserData updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: "something went wrong" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addEmails,
  getUserDetailsById,
  updateUserDetailsById,
};
