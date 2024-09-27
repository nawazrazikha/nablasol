import React, { useContext, useState, useEffect } from "react";
import FormContext from "../FormContext/form.context";
import "./Page1.css";

export const Page1 = () => {
  const [newClient, setNewClient] = useState("");
  const [clients, setClients] = useState(["Client A", "Client B", "Client C"]);

  const {
    projectName,
    setProjectName,
    client,
    setClient,
    dates,
    setDates,
    notes,
    setNotes,
  } = useContext(FormContext);

  // Load initial values from localStorage
  useEffect(() => {
    const storedProjectName = localStorage.getItem("projectName");
    const storedClient = localStorage.getItem("client");
    const storedDates = JSON.parse(localStorage.getItem("dates"));
    const storedNotes = localStorage.getItem("notes");

    if (storedProjectName) setProjectName(storedProjectName);
    if (storedClient) setClient(storedClient);
    if (storedDates) setDates(storedDates);
    if (storedNotes) setNotes(storedNotes);
  }, []);

  // Save data to localStorage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  // Add a new client to the dropdown
  const handleAddClient = () => {
    if (newClient && !clients.includes(newClient)) {
      setClients([...clients, newClient]);
      setNewClient("");
    }
  };

  return (
    <div className="form-card">
      <h3 className="text-center">Create a Project</h3>
      <form className="form">
        {/* Project Name */}
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              saveToLocalStorage("projectName", e.target.value);
            }}
            className="form-control"
            placeholder="Enter project name"
          />
        </div>

        {/* Client with dropdown and new client input */}
        <div className="mb-3 flex-column">
          <label htmlFor="client" className="form-label">
            Client
          </label>
          <div className="flex-row">
            <div className="dropdown-wrapper">
              <select
                className="form-control dropdown"
                value={client}
                onChange={(e) => {
                  setClient(e.target.value);
                  saveToLocalStorage("client", e.target.value);
                }}
              >
                {clients.map((clientOption, index) => (
                  <option key={index} value={clientOption}>
                    {clientOption}
                  </option>
                ))}
              </select>
              <span className="dropdown-icon">▼</span>
            </div>

            <span className="or-separator">Or</span>

            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              className="form-control new-client-input w-[20px]"
              placeholder="+ new client"
            />
            <button
              type="button"
              className="btn btn-primary ml-2 add-client-btn"
              onClick={handleAddClient}
            >
              Add Client
            </button>
          </div>
        </div>

        {/* Dates in a single row */}
        <div className="mb-3 flex-column">
          <label htmlFor="dates" className="form-label">
            Dates
          </label>
          <div className="flex-row">
            <input
              type="date"
              value={dates.start}
              onChange={(e) => {
                const updatedDates = { ...dates, start: e.target.value };
                setDates(updatedDates);
                saveToLocalStorage("dates", JSON.stringify(updatedDates));
              }}
              className="form-control date-input"
            />
            <input
              type="date"
              value={dates.end}
              onChange={(e) => {
                const updatedDates = { ...dates, end: e.target.value };
                setDates(updatedDates);
                saveToLocalStorage("dates", JSON.stringify(updatedDates));
              }}
              className="form-control ml-2 date-input"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              saveToLocalStorage("notes", e.target.value);
            }}
            className="form-control"
            placeholder="Add notes here"
          />
        </div>
      </form>
    </div>
  );
};
