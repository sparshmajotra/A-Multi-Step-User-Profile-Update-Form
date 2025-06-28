import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Step1PersonalInfo = ({ formData, setFormData, nextStep }) => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [profilePreview, setProfilePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const checkUsername = async (username) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/check-username/${username}`);
      setUsernameAvailable(res.data.available);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      const file = files[0];
      if (
        file &&
        file.size <= 2 * 1024 * 1024 &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        setFormData({ ...formData, [name]: file });
        setProfilePreview(URL.createObjectURL(file));
      } else {
        alert("Only JPG/PNG files under 2MB allowed.");
      }
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "username" && value.length >= 4) {
        checkUsername(value);
      }
    }
  };

  const handleNext = () => {
    let tempErrors = {};

    if (!formData.username || formData.username.length < 4) {
      tempErrors.username = "Username must be at least 4 characters.";
    }
    if (!usernameAvailable) {
      tempErrors.username = "Username is already taken.";
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        tempErrors.currentPassword = "Current password is required to change password.";
      }
      if (formData.newPassword.length < 8) {
        tempErrors.newPassword = "New password must be 8+ characters.";
      }
      if (!/[!@#$%^&*]/.test(formData.newPassword)) {
        tempErrors.newPassword = "New password needs a special character.";
      }
      if (!/[0-9]/.test(formData.newPassword)) {
        tempErrors.newPassword = "New password needs a number.";
      }
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="form-step container">
      <h2 className="form-title">Step 1: Personal Information</h2>

      <div className="form-group">
        <label>Profile Photo (JPG/PNG, max 2MB)</label>
        <input type="file" name="profilePhoto" onChange={handleChange} />
        {profilePreview && (
          <img src={profilePreview} alt="preview" className="preview-image" />
        )}
      </div>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
        />
        {!usernameAvailable && (
          <span className="error-text">Username already taken</span>
        )}
        {errors.username && (
          <span className="error-text">{errors.username}</span>
        )}
      </div>

      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword || ""}
          onChange={handleChange}
        />
        {errors.currentPassword && (
          <span className="error-text">{errors.currentPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword || ""}
          onChange={handleChange}
        />
        {errors.newPassword && (
          <span className="error-text">{errors.newPassword}</span>
        )}
      </div>

      <div className="button-group">
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;

// This component handles the first step of the form, allowing users to enter their personal information such as profile photo, username, and password.
// It includes validation for username availability and password strength, and provides a preview of the uploaded profile