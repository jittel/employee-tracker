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

// runs whole thing on start
db.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + db.threadId + "\n");
    // prompts();
});

// ask all prompts
function prompts() {
    inquirer.prompt({
        message: "pick an option:",
        type: "list",
        choices: [
            "view all employees",
            "view all departments",
            "view all roles",
            "add employee",
            "add department",
            "add role",
            "update employee role",
            "quit"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice)
        // TODO: make a case and switch for every answer
        switch (answers.choice) {
            case "view all employees":
                viewEmp();
                break;
            case "view all departments":
                viewDep();
                break;
            case "view all roles":
                viewRoles();
                break;
            default:
                db.end();
                break;
        }
    })
}

// view all employees
function viewEmp() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data);
        prompts();
    })
}
// view all departments
function viewDep() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data);
        prompts();
    })
}

// view all roles
function viewRoles() {
    db.query("SELECT * FROM roles", (err, data) => {
        if (err) throw err;
        console.table(data);
        prompts();
    })
}

// TODO: add employee

// TODO: add department

// TODO: add role

// TODO: update employee role