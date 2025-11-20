# Student Attendance Management System

This is a simple and efficient web-based system that allows teachers to mark attendance and students to view their attendance records.  
The project includes secure login functionality and role-based access using authentication.

---

## Features

- Login system for both Students and Teachers  
- Teacher:
  - Add Attendance
  - View Attendance
- Student:
  - View Attendance only  
- MongoDB database storage  
- Role-based authorization  
- JWT secured login session

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT and bcrypt |

---

## Database Structure

### Users Collection

- username  
- password (encrypted)  
- role (student or teacher)  

### Attendance Collection

- studentName  
- status (Present/Absent)  
- date  
- markedBy (teacher username)  

---
