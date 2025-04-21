const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Veera@0134',
    database: "hrms_db" 
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API Route to handle form submission
app.post("/submit", (req, res) => {
    const { name, email, contact, designation } = req.body;

    const sql = "INSERT INTO employees (name, email, contact, designation) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, contact, designation], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json({ message: "Employee onboarded successfully!" });
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
