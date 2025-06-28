import React from "react";
import "./Form.css";

const Step2ProfessionalDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (!formData.addressLine1) {
      alert("Address Line 1 is required");
      return;
    }
    nextStep();
  };

  return (
    <div className="form-step container" style={{ border: "3px solid orange" }} >
      <h2 className="form-title">Step 2: Professional Details</h2>

      <div className="form-group">
        <label>Profession</label>
        <select
          name="profession"
          value={formData.profession || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
      </div>

      {formData.profession === "Entrepreneur" && (
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="form-group">
        <label>Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1 || ""}
          onChange={handleChange}
        />
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={prevStep}>Back</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2ProfessionalDetails;
// This component handles the second step of the form, allowing users to enter their professional details such as profession, company name, and address.
// It includes a dropdown for profession selection and conditionally displays the company name field if the user