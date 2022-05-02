const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // Add MySQL Password
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the books_db database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });