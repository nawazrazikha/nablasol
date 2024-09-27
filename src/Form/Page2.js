import React, { useContext, useEffect } from "react";
import FormContext from "../FormContext/form.context";
import { FaListAlt, FaThLarge } from "react-icons/fa";
import "./Page2.css"; // Assuming the CSS file

export const Page2 = () => {
  const { selectView, setSelectView } = useContext(FormContext);

  // Retrieve saved selection from localStorage on load
  useEffect(() => {
    const savedView = localStorage.getItem("selectedView");
    if (savedView) {
      setSelectView(savedView);
    }
  }, [setSelectView]);

  // Function to handle the selection and store in localStorage
  const handleSelect = (view) => {
    setSelectView(view);
    localStorage.setItem("selectedView", view);
  };

  return (
    <div className="page-container">
      <h3 className="text-center">Select a View</h3>
      <div className="cards-container">
        {/* List Card */}
        <div
          className={`card ${selectView === "List" ? "selected-card" : ""}`}
          onClick={() => handleSelect("List")}
        >
          <div className="icon-container">
            <FaListAlt size={50} />
          </div>
          <div className="card-name">List</div>
        </div>

        {/* Board Card */}
        <div
          className={`card ${selectView === "Board" ? "selected-card" : ""}`}
          onClick={() => handleSelect("Board")}
        >
          <div className="icon-container">
            <FaThLarge size={50} />
          </div>
          <div className="card-name">Board</div>
        </div>
      </div>
    </div>
  );
};
