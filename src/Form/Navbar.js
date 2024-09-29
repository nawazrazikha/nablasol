import React from "react";
import "./Navbar.css"; // For custom styles

export const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="navbar">
      <div
        className={`nav-item ${currentPage === 1 ? "active" : ""}`}
        onClick={() => setCurrentPage(1)}
      >
        Time and Materials
      </div>
      <div
        className={`nav-item ${currentPage === 2 ? "active" : ""}`}
        onClick={() => setCurrentPage(2)}
      >
        Fixed Fee
      </div>
      <div
        className={`nav-item ${currentPage === 3 ? "active" : ""}`}
        onClick={() => setCurrentPage(3)}
      >
       Non Bailable
      </div>
    </div>
  );
};