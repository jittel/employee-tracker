INSERT INTO department (id, department_name) VALUES (001, "Party Crew"), (002, "Magic Zone");

INSERT INTO roles (id, title, salary, department_id) VALUES (001, "CEO", 5000000, 1), (002, "Magical Guy", 1000000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (001, "nate", "ginn", 1, 1), (002, "chris", "delagarza", 2, 2);