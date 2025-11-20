const express = require("express");
const router = express.Router();
const { addAttendance } = require("../controllers/attendanceController");
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Route: Add attendance (only teachers)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Unauthorized! Only teachers can add attendance." });
    }

    await addAttendance(req, res);
  } catch (err) {
    console.error("❌ Error adding attendance:", err);
    res.status(500).json({ message: "Server error while adding attendance." });
  }
});

// ✅ Route: View attendance (only students)
router.get("/view", authMiddleware, async (req, res) => {
  try {
    console.log("🔍 Token decoded user:", req.user);

    // Allow only students to access this page
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Unauthorized! Only students can view attendance." });
    }

    // Fetch attendance using student's name (stored in JWT)
    const records = await Attendance.find({ studentName: req.user.username });

    if (!records || records.length === 0) {
      return res.json([]);
    }

    res.json(records);
  } catch (err) {
    console.error("❌ Error fetching attendance:", err);
    res.status(500).json({ message: "Server error while fetching attendance." });
  }
});

module.exports = router;
