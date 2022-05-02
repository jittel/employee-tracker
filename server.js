const inquirer = require('inquirer');
const mysql = require('mysql2');

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
  console.log(`Connected to the employee_db database.`)
);
