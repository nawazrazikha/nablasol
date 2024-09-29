import React, { useState } from "react";
import "./Page2.css"; // Assuming the CSS file
import { Navbar } from "./Navbar";

export const Page2 = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [projectRate, setProjectRate] = useState("");
  const [hoursPerPerson, setHoursPerPerson] = useState("");
  const [budgetReset, setBudgetReset] = useState(false);
  const [sendEmailAlerts, setSendEmailAlerts] = useState(false);

  // Handle form submission and store data in local storage
  const handleNext = () => {
    const formData = {
      hourlyRate,
      projectRate,
      hoursPerPerson,
      budgetReset,
      sendEmailAlerts
    };

    // Store data in local storage with a unique index
    const formIndex = localStorage.length + 1;
    localStorage.setItem(`formData-${formIndex}`, JSON.stringify(formData));
    alert("Form data saved successfully!");
  };

  return (
    <div className="page-container">
      <h3 className="text-center">Select a View</h3>
      <div className="cards-container">
        <Navbar />
        <h4>Hourly</h4>
        <p>We need hourly rates to track your project's billable amount</p>

        {/* Row with two input fields */}
        <div className="input-row">
          {/* Dropdown input for Project Hourly rate */}
          <select
            className="input-field"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          >
            <option value="" disabled selected>
              Project Hourly Rate
            </option>
            <option value="rate1">Rate 1</option>
            <option value="rate2">Rate 2</option>
            <option value="rate3">Rate 3</option>
          </select>

          {/* Second input field for Rs. 10,851 */}
          <input
            type="text"
            placeholder="Rs. 10,851"
            className="input-field"
            value={projectRate}
            onChange={(e) => setProjectRate(e.target.value)}
          />
        </div>

        {/* Content Budget Section */}
        <h4>Budget</h4>
        <p>We need hourly rates to track your project's billable amount</p>
        <div className="input-row">
          {/* Dropdown for Hours per person */}
          <select
            className="input-field small-dropdown"
            value={hoursPerPerson}
            onChange={(e) => setHoursPerPerson(e.target.value)}
          >
            <option value="" disabled selected>
              Hours per person
            </option>
            <option value="8hours">8 Hours</option>
            <option value="10hours">10 Hours</option>
            <option value="12hours">12 Hours</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={budgetReset}
              onChange={(e) => setBudgetReset(e.target.checked)}
            />
            Budget resets every month
          </label>
        </div>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={sendEmailAlerts}
              onChange={(e) => setSendEmailAlerts(e.target.checked)}
            />
            Send email alerts if project exceeds <strong>100%</strong> of budget
          </label>
        </div>

        {/* Next Button */}
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
