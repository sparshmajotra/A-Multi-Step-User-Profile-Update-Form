import React, { useState, useEffect } from "react";
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // 🛠️ API Submission on final step
  useEffect(() => {
    const submitForm = async () => {
      if (step !== 5) return; // trigger only when step === 5
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/submit-profile`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        setResponse(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    submitForm();
  }, [step, formData]);

  // After steps 1–4, final step becomes 5 to trigger submission
  const handleFinish = () => setStep(5);

  return (
    <div className="App">
      <h1>Multi‑Step User Profile Form</h1>

      {step === 1 && (
        <Step1PersonalInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Step2ProfessionalDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 3 && (
        <Step3Preferences formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 4 && (
        <Step4Summary formData={formData} prevStep={prevStep} nextStep={handleFinish} />
      )}

      {/* 🟡 Loading & Error States */}
      {loading && <p>Submitting form, please wait…</p>}
      {error && <p style={{ color: "red" }}>❗{error}</p>}
      {response && (
        <div>
          <h2>Success!</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
