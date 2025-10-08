const express = require("express");
const Student = require("./models/Student");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function ConnectDB() {
  try {
    await await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongo db");
  } catch (error) {
    console.log("Connection Failed");
  }
}

ConnectDB();

app.get("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching student",
      error: error.message,
    });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const Students = await Student.find();
    res.status(200).json({
      success: true,
      message: "Getting all the students",
      students: Students,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error Getting All students",
      error: error,
    });
  }
});

app.post("/api/student", async (req, res) => {
  try {
    const { name, age } = req.body;

    const student = new Student({ name, age });
    await student.save();

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
});

app.put("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
});

app.delete("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("App is running in PORT", PORT);
});
