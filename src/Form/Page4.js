import React, { useState, useEffect } from "react";
import "./Page4.css";

const Page4 = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [inputFields, setInputFields] = useState([]);

  // Sample data to display as a team list
  const [sampleTeam, setSampleTeam] = useState([
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Emily Clark"
  ]);

  // Load team members from localStorage on initial render
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setTeamMembers(storedMembers);
  }, []);

  // Save team members to localStorage whenever the team changes
  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Add selected sample data to input fields when a checkbox is clicked
  const toggleMemberSelection = (member) => {
    if (!inputFields.some((field) => field.member === member)) {
      setInputFields([...inputFields, { member, value: member }]);
    } else {
      setInputFields(inputFields.filter((field) => field.member !== member));
    }
  };

  // Handle changes to individual input fields
  const handleInputChange = (index, event) => {
    const updatedFields = [...inputFields];
    updatedFields[index].value = event.target.value;
    setInputFields(updatedFields);
  };

  // Add all selected members (from input fields) to the team list and store in localStorage
  const addMembers = () => {
    const newMembers = inputFields.map((field) => field.value);
    const uniqueMembers = newMembers.filter(
      (member) => !teamMembers.includes(member)
    );
    if (uniqueMembers.length > 0) {
      setTeamMembers([...teamMembers, ...uniqueMembers]);
    }
    // Clear the input fields after adding members
    setInputFields([]);
  };

  // Delete an input field (cross mark in the input)
  const deleteInputField = (member) => {
    setInputFields(inputFields.filter((field) => field.member !== member));
  };

  // Delete a member from the sample list (cross mark in the sample list)
  const deleteSampleMember = (member) => {
    setSampleTeam(sampleTeam.filter((m) => m !== member));
    setInputFields(inputFields.filter((field) => field.member !== member));
  };

  return (
    <div className="team-card">
      <h3 className="text-center">Team</h3>
      <div className="add-member-container">
        <label>Invite or add a person</label>

        {/* Input fields for selected members */}
        <div className="selected-members">
          {inputFields.map((field, index) => (
            <div key={index} className="selected-member">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(index, e)}
                className="member-input-field"
                placeholder="Add"
              />
              <button
                className="delete-selected-btn"
                onClick={() => deleteInputField(field.member)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-primary ml-2 add-client-btn"
          onClick={addMembers}
        >
          Add
        </button>
      </div>

      <div className="team-list">
        {sampleTeam.map((member, index) => (
          <div key={index} className="team-item">
            <input
              type="checkbox"
              checked={inputFields.some((field) => field.member === member)}
              onChange={() => toggleMemberSelection(member)}
              className="team-checkbox"
            />
            <span className="team-name">{member}</span>
            <button
              className="delete-btn"
              onClick={() => deleteSampleMember(member)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page4;
