const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB Connected");

    // Create many teacher and many student
    const hashedPassword1 = await bcrypt.hash("rawatswati123", 10);
    const hashedPassword2 = await bcrypt.hash("harpreetk123", 10);
    const hashedPassword3 = await bcrypt.hash("amanpreetk123", 10);
    const hashedPassword4 = await bcrypt.hash("khushi123", 10);
    const hashedPassword5 = await bcrypt.hash("vishakha123", 10);
    const hashedPassword6 = await bcrypt.hash("puja123", 10); 


    await User.deleteMany(); // optional: clears all users

    await User.insertMany([
        { username: "rawatswati", password: hashedPassword1, role: "teacher" },
        { username: "harpreetk", password: hashedPassword2, role: "teacher" },
        { username: "amanpreetk", password: hashedPassword3, role: "teacher" },
        { username: "khushi25", password: hashedPassword4, role: "student" },
        { username: "vishakha23", password: hashedPassword5, role: "student" },
        { username: "puja2307", password: hashedPassword6, role: "student" }
    ]);

    console.log("Users added");
    //process.exit();
    mongoose.connection.close();
})
.catch(err => console.error(err));
