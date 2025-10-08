import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudent.css";
const API_URL = import.meta.env.VITE_API_URL;

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age) {
      alert("Please enter name and age");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/student/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Student created successfully!");
        navigate("/students");
      } else {
        alert("Failed to create student");
      }
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Error creating student");
    }
  };

  return (
    <div className="create-student-card">
      <h2>Create Student</h2>
      <form className="create-student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter student age"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
