import React, { useState } from "react";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2ProfessionalDetails from "./Step2ProfessionalDetails";
import Step3Preferences from "./Step3Preferences";
import Step4Summary from "./Step4Summary";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    username: "",
    currentPassword: "",
    newPassword: "",
    profession: "",
    companyName: "",
    addressLine1: "",
    country: "",
    state: "",
    city: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="App">
      <h1>Multi-Step User Profile Form</h1>

      {step === 1 && (
        <Step1PersonalInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <Step2ProfessionalDetails
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <Step3Preferences
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <Step4Summary
          formData={formData}
          prevStep={prevStep}
        />
      )}
    </div>
  );
}

export default App;
