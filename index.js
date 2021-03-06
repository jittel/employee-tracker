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
    prompts();
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

        // runs various functions based on prompt answer
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
            case "add employee":
                addEmp();
                break;
            case "add department":
                addDep();
                break;
            case "add role":
                addRoles();
                break;
            case "update employee role":
                updateRoles();
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

// add employee
function addEmp() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "enter employee first name"
        },
        {
            type:"input",
            name:"lastName",
            message:"enter employee last name"
        },
        {
            type:"number",
            name: "roleId",
            prompt: "enter role ID"
        },
        {
            type:"number",
            name: "managerId",
            prompt: "enter manager ID"
        }
    ]).then((res) => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId],(err, data) => {
            if (err) throw err;
            console.table(data);
            prompts();
        })
    })
}

// add department
function addDep() {
    inquirer.prompt([
        {
            type:"input",
            name:"department",
            message:"enter department name"
        }
    ]).then((res) => {
        db.query("INSERT INTO department (department_name) VALUES (?)", [res.department],(err, data) => {
            if (err) throw err;
            console.table(data);
            prompts();
        })
    })
}

// add role
function addRoles() {
    inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"enter role title"
        },
        {
            type:"number",
            name:"salary",
            message:"enter salary"
        },
        {
            type:"number",
            name:"departmentId",
            message:"enter department ID"
        }
    ]).then((res) => {
        db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res.departmentId],(err, data) => {
            if (err) throw err;
            console.table(data);
            prompts();
        })
    })
}

// update employee role
function updateRoles() {
    inquirer.prompt([
        {
            type:"number",
            name:"employeeId",
            message:"enter employee ID of the employee who's role you want to change"
        },
        {
            type:"number",
            name:"roleId",
            message:"enter the ID of the new role"
        }
    ]).then((res) => {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [res.roleId, res.employeeId],(err, data) => {
            if (err) throw err;
            console.table(data);
            prompts();
        })
    })
}
