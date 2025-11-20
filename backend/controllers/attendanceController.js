const Attendance = require('../models/Attendance');

exports.addAttendance = async (req, res) => {
  try {
    const { studentName, status } = req.body;

    if (!studentName || !status) {
      return res.status(400).json({ message: "Student name and status are required." });
    }

    // Make sure only teachers can mark attendance
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can mark attendance." });
    }

    const attendance = new Attendance({
      studentName,
      status,
      date: new Date(),
      markedBy: req.user.id, // from authMiddleware
    });

    await attendance.save();
    console.log("✅ Attendance saved successfully!");
    res.status(201).json({ message: "Attendance added successfully!" });
  } catch (err) {
    console.error("❌ Error saving attendance:", err);
    res.status(500).json({ message: "Server error while saving attendance." });
  }
};
