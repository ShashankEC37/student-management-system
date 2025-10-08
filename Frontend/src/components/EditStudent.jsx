import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import "./CreateStudent.css";
const EditStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/student/${id}`);
        const data = await response.json();

        if (data.success && data.student) {
          setName(data.student.name);
          setAge(data.student.age);
        } else {
          alert("Student not found!");
          navigate("/students");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        alert("Error loading student data!");
        navigate("/students");
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handldleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Student updated successfully!");
        navigate("/students");
      } else {
        alert("Failed to update student");
      }
    } catch (error) {
      console.log("Error updateing student", error);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handldleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">Update</button>
        <button onClick={() => navigate("/students")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudent;
