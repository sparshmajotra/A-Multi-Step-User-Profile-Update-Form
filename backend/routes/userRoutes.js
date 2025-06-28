const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// set up multer for profile photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPG or PNG images allowed"));
    }
  },
});

// handle profile create/update
router.post("/save", upload.single("profilePhoto"), async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body); // debug
    console.log("REQ.FILE:", req.file); // debug

    const {
      username,
      currentPassword,
      newPassword,
      gender,
      customGender,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
      dateOfBirth,
    } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    // hash new password if provided
    let hashedPassword;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const userData = {
      username,
      gender,
      customGender,
      profession,
      companyName: profession === "Entrepreneur" ? companyName : "",
      address: {
        addressLine1,
        country,
        state,
        city,
      },
      subscriptionPlan,
      newsletter,
      dateOfBirth,
    };

    if (hashedPassword) {
      userData.password = hashedPassword;
    }

    if (req.file) {
      userData.profilePhoto = req.file.filename;
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      userData,
      { upsert: true, new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// check username availability
router.get("/check-username/:username", async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.params.username });
    res.json({ available: !exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// This route handles user profile creation and updates.
// It uses multer for file uploads and bcrypt for password hashing.