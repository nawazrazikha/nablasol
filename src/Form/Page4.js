import React, { useState, useEffect } from "react";
import "./Page4.css";

const Page4 = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [inputMembers, setInputMembers] = useState([]);

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

  // Add selected member to the input field
  const toggleMemberSelection = (member) => {
    if (!inputMembers.includes(member)) {
      setSelectedMember(member);
    } else {
      alert("This member is already selected.");
    }
  };

  // Add member to the team list and store in localStorage
  const addMember = () => {
    if (selectedMember.trim()) {
      if (!teamMembers.includes(selectedMember)) {
        setTeamMembers([...teamMembers, selectedMember]);
      }
      if (!sampleTeam.includes(selectedMember)) {
        setSampleTeam([...sampleTeam, selectedMember]);
      }
      setInputMembers([...inputMembers, selectedMember]);
      setSelectedMember(""); // Clear input field after adding the member
    }
  };

  // Delete a member from the input field
  const deleteInputMember = (member) => {
    setInputMembers(inputMembers.filter((m) => m !== member));
  };

  // Delete a member from the sample list (cross mark click)
  const deleteSampleMember = (member) => {
    setSampleTeam(sampleTeam.filter((m) => m !== member));
    setInputMembers(inputMembers.filter((m) => m !== member));
  };

  return (
    <div className="team-card">
      <h3 className="text-center">Team</h3>
      <div className="add-member-container">
        <label>Invite or add a friend</label>
        <input
          type="text"
          id="member-input"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="member-input"
          placeholder="Add"
        />
        <button
          type="button"
          className="btn btn-primary ml-2 add-client-btn"
          onClick={addMember}
        >
          Add
        </button>
      </div>

      <div className="selected-members">
        {inputMembers.map((member, index) => (
          <span key={index} className="selected-member">
            {member}
            <button
              className="delete-selected-btn"
              onClick={() => deleteInputMember(member)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <div className="team-list">
        {sampleTeam.map((member, index) => (
          <div key={index} className="team-item">
            <input
              type="checkbox"
              checked={inputMembers.includes(member)}
              onChange={() => {
                toggleMemberSelection(member);
                if (!inputMembers.includes(member)) {
                  setInputMembers([...inputMembers, member]);
                }
              }}
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
