import React from "react";
import "./Form.css";

function Step4Summary({ formData }) {
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("username", formData.username);
      formDataToSend.append("currentPassword", formData.currentPassword);
      formDataToSend.append("newPassword", formData.newPassword);
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("customGender", formData.customGender || "");
      formDataToSend.append("profession", formData.profession || "");
      formDataToSend.append("companyName", formData.companyName || "");
      formDataToSend.append("addressLine1", formData.addressLine1 || "");
      formDataToSend.append("country", formData.country || "");
      formDataToSend.append("state", formData.state || "");
      formDataToSend.append("city", formData.city || "");
      formDataToSend.append("subscriptionPlan", formData.subscriptionPlan || "");
      formDataToSend.append("newsletter", formData.newsletter ? "true" : "false");
      formDataToSend.append("dateOfBirth", formData.dateOfBirth || "");

      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      const response = await fetch("http://localhost:5000/api/users/save", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Profile submitted successfully!");
      } else {
        alert(`Submission failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during submission.");
    }
  };

  return (
    <div className="form-step container">
      <h2 className="form-title">Step 4: Review & Submit</h2>
      <div className="summary">
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Gender:</strong> {formData.gender === "Other" ? formData.customGender : formData.gender}</p>
        <p><strong>Profession:</strong> {formData.profession}</p>
        {formData.profession === "Entrepreneur" && (
          <p><strong>Company:</strong> {formData.companyName}</p>
        )}
        <p><strong>Address:</strong> {formData.addressLine1}, {formData.city}, {formData.state}, {formData.country}</p>
        <p><strong>Subscription:</strong> {formData.subscriptionPlan}</p>
        <p><strong>Newsletter:</strong> {formData.newsletter ? "Yes" : "No"}</p>
        <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
        {formData.profilePhoto && (
          <div>
            <strong>Profile Photo:</strong>
            <br />
            <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile Preview" width="100" />
          </div>
        )}
      </div>
      <div className="button-group">
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Step4Summary;
// This component handles the final step of the form, allowing users to review their entered information and submit it.
// It displays a summary of all the data collected in previous steps and sends the data to the