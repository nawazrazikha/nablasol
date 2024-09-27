import React, { useState, useEffect } from "react";
import "./Page3.css";

export const Page3 = () => {
  // Initial sample tasks
  const sampleTasks = [
    { name: "Task 1: Sample task", completed: false },
    { name: "Task 2: Another sample task", completed: true },
    { name: "Task 3: Yet another sample task", completed: false },
  ];

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage or use sample tasks on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks); // Load from localStorage if available
    } else {
      setTasks(sampleTasks); // Use sample tasks if localStorage is empty
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task handler
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask(""); // Clear input after adding task
    }
  };

  // Delete task handler
  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTask = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) =>
      index === indexToToggle ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="task-card">
      <h3 className="text-center">Tasks</h3>
      <div className="add-task-container">
        <label htmlFor="task-input" className="task-label">Add Task:</label>
        <input
          type="text"
          id="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
          placeholder="Enter task"
        />
        {/* <button className="btn btn-blue" onClick={addTask}>Add Task</button> */}
        <button
              type="button"
              className="btn btn-primary ml-2 add-client-btn"
              onClick={addTask}
            >
              Add Task
            </button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
              className="task-checkbox"
            />
            <span
              className={`task-name ${task.completed ? "completed" : ""}`}
            >
              {task.name}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page3;
