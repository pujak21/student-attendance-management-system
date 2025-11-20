// ========== TEACHER LOGIN ==========
document.getElementById('teacher-login-form')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Teacher login form submitted ✅");

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!username || !password) {
        document.getElementById('error-message').textContent = "Please fill in both fields.";
        return;
    }

    try {
        console.log("Sending teacher login request...");
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role: "teacher" })
        });

        const data = await res.json();
        console.log("Teacher login response:", data);

        if (res.ok) {
            // ✅ Save token & role
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('role', data.role);

            alert("✅ Teacher Login Successful!");
            window.location.href = "attendance.html";
        } else {
            document.getElementById('error-message').textContent = data.message || "Invalid credentials.";
        }
    } catch (err) {
        console.error("⚠️ Teacher Login Error:", err);
        document.getElementById('error-message').textContent = "Server error! Please try again later.";
    }
});


// ========== STUDENT LOGIN ==========
document.getElementById('student-login-form')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Student login form submitted ✅");

    const username = document.getElementById('student-username').value.trim();
    const password = document.getElementById('student-password').value.trim();

    if (!username || !password) {
        document.getElementById('student-error-message').textContent = "Please fill in both fields.";
        return;
    }

    try {
        console.log("Sending student login request...");
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role: "student" })
        });

        const data = await res.json();
        console.log("Student login response:", data);

        if (res.ok) {
            // ✅ Save token & role
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('role', data.role);

            alert("✅ Student Login Successful!");
            window.location.href = "view-attendance.html"; // redirect to view page
        } else {
            document.getElementById('student-error-message').textContent = data.message || "Invalid credentials.";
        }
    } catch (err) {
        console.error("⚠️ Student Login Error:", err);
        document.getElementById('student-error-message').textContent = "Server error! Please try again later.";
    }
});


// ========== ADD ATTENDANCE ==========
async function addAttendance() {
    const name = document.getElementById('student-name').value.trim();
    const status = document.getElementById('attendance-status').value;
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!token || role !== "teacher") {
        alert("Unauthorized! Only teachers can add attendance.");
        return;
    }

    if (!name) {
        alert("Please enter the student name.");
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/attendance/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ studentName: name, status })
        });

        const data = await res.json();
        console.log("Attendance response:", data);

        if (res.ok) {
            alert("✅ Attendance Added Successfully!");
            const attendanceList = document.getElementById('list');
            const newEntry = document.createElement('li');
            newEntry.textContent = `${name}: ${status}`;
            attendanceList.appendChild(newEntry);
            document.getElementById('attendance-form').reset();
        } else {
            alert(`❌ Error: ${data.message}`);
        }
    } catch (err) {
        console.error("⚠️ Attendance Error:", err);
        alert("❌ Something went wrong while saving attendance.");
    }
}
