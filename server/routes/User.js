const express = require("express");
const router = express.Router();

const UserController=require("../controller/UserController");

router.post("/register",UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/add/emails",UserController.addEmails);
router.get("/user-details/:userId", UserController.getUserDetailsById);
router.put("/update/:userId", UserController.updateUserDetailsById);


module.exports = router;

