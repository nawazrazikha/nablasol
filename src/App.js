

import "./App.css";
import React, { useState, useContext } from "react";
import { Page1 } from "./Form/Page1";
import { Page2 } from "./Form/Page2";
import { Page3 } from "./Form/Page3";
import Page4 from "./Form/Page4";
import FormContext from "./FormContext/form.context";

function App() {
  const [pgNo, setPgNo] = useState(1);
  const {
    projectName,
    client,
    dates,
    notes,
    selectView,
    tasks,
    teamMembers,
  } = useContext(FormContext);

  // Function to save all data to local storage
  const saveAllData = () => {
    const allData = {
      projectName,
      client,
      dates,
      notes,
      selectView,
      tasks,
      teamMembers,
    };
    localStorage.setItem("formData", JSON.stringify(allData));
    alert("All data saved successfully!");
  };

  return (
    <div className="container">
      {/* <center className="mt-4">
        <p>Page {pgNo} / 4</p>
      </center> */}

      <div>
        {/* Render the pages based on the current page number */}
        {pgNo === 1 ? <Page1 /> : pgNo === 2 ? <Page2 /> : pgNo === 3 ? <Page3 /> : <Page4 />}

        {/* Navigation buttons (Back/Next) */}
        <center>
          {pgNo > 1 && (
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setPgNo(pgNo - 1)}
            >
              Back
            </button>
          )}
          {pgNo < 4 && (
            <button
              className="btn btn-primary mx-4"
              type="button"
              onClick={() => setPgNo(pgNo + 1)}
            >
              Next
            </button>
          )}
          {pgNo === 4 && (
            <button
              className="btn btn-primary mx-4"
              type="button"
              onClick={saveAllData} // Save all data on the last page
            >
              Create a Project
            </button>
          )}
        </center>

        {/* Slider with buttons 1, 2, 3 */}
        <div className="d-flex justify-content-center mt-4">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`btn mx-2 ${pgNo === num ? "btn-success" : "btn-secondary"}`}
              type="button"
              onClick={() => setPgNo(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

