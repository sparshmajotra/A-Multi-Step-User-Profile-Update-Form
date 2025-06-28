import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";

const Step3Preferences = ({ formData, setFormData, nextStep, prevStep }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState("");

  // Fetch countries on mount
  useEffect(() => {
    setLoadingCountries(true);
    axios
      .get("http://localhost:5000/api/locations/countries")
      .then((res) => {
        setCountries(res.data);
        setLoadingCountries(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load countries");
        setLoadingCountries(false);
      });
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (formData.country) {
      setLoadingStates(true);
      axios
        .get(`http://localhost:5000/api/locations/states/${formData.country}`)
        .then((res) => {
          setStates(res.data);
          setLoadingStates(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load states");
          setLoadingStates(false);
        });
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [formData.country, setFormData]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.state) {
      setLoadingCities(true);
      axios
        .get(`http://localhost:5000/api/locations/cities/${formData.state}`)
        .then((res) => {
          setCities(res.data);
          setLoadingCities(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load cities");
          setLoadingCities(false);
        });
      setFormData((prev) => ({ ...prev, city: "" }));
    } else {
      setCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(""); // clear errors
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formData.country || !formData.state || !formData.city) {
      alert("Please select country, state, and city");
      return;
    }
    nextStep();
  };

  return (
    <div className="form-step container">
      <h2 className="form-title">Step 3: Preferences</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="form-group">
        <label>Country</label>
        <select
          name="country"
          value={formData.country || ""}
          onChange={handleChange}
          disabled={loadingCountries}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        {loadingCountries && <p className="loading-text">Loading countries...</p>}
      </div>

      <div className="form-group">
        <label>State</label>
        <select
          name="state"
          value={formData.state || ""}
          onChange={handleChange}
          disabled={!states.length || loadingStates}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
        {loadingStates && <p className="loading-text">Loading states...</p>}
      </div>

      <div className="form-group">
        <label>City</label>
        <select
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          disabled={!cities.length || loadingCities}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        {loadingCities && <p className="loading-text">Loading cities...</p>}
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={prevStep}>Back</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step3Preferences;
// This component handles the third step of the form, allowing users to select their preferences such as country, state, and city.
// It fetches the list of countries, states, and cities from the backend API and updates