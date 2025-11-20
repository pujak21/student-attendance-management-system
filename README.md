Student Attendance Management System

A simple and efficient web-based system that allows teachers to mark attendance and students to view their attendance records. The project includes secure login and role-based access using authentication.

Features

Login System (Student & Teacher)
Teacher
   -Add attendance
   -View attendance
Student
   -View attendance only
MongoDB database storage
Role-based authorization
JWT secure tokens

Tech Stack

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB + Mongoose
Authentication: JWT + bcrypt

Database Collections
Users
  -username
  -password (encrypted)
  -role: student or teacher

Attendance
  -studentName
  -status (Present/Absent)
  -date
  -markedBy (teacher)

Future Improvements
   -Monthly attendance report
   -Email notifications
   -Mobile responsive UI upgrade
