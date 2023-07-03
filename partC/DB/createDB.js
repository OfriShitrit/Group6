// var SQL = require('./db');
// const path = require('path');
const { lutimes } = require("fs");
// const sql = require("express");

const express = require("express");
const app = express();
const path = require("path");
const BodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const sql = require("./db");

//set up to csv reader
const csv = require("csvtojson");

const CreateDb = (req, res) => {
    const query = `Create DATABASE IF NOT EXISTS web`;
    sql.query(query, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            // res.status(400).send({message: "error in creating db"});
            return;
        }
        console.log("created db web");
        return;
    });
};

const CreateUsers = (req, res) => {
    const Q1 = `
        CREATE TABLE IF NOT EXISTS web.Users(
            name VARCHAR(50) NOT NULL, 
            lastName VARCHAR(50) NOT NULL, 
            email VARCHAR(150) NOT NULL, 
            userName VARCHAR(50) NOT NULL, 
            password VARCHAR(30) NOT NULL, 
            city VARCHAR(50) NOT NULL, 
            gender VARCHAR(10) NOT NULL, 
            phone VARCHAR(50) NOT NULL, 
            PRIMARY KEY (phone)
        );`;
    sql.query(Q1, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            // res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log("created table users");
        // res.send("table created");
        return;
    });
};

const insertUsers = (req, res) => {
    const csvPath = path.join(__dirname, "../content/users.csv");
    csv()
        .fromFile(csvPath)
        .then((jsonObj) => {
            jsonObj.forEach((element) => {
                console.log(element);
                var NewCsvData = {
                    name: element.name,
                    lastName: element.lastName,
                    email: element.email,
                    userName: element.userName,
                    password: element.password,
                    city: element.city,
                    gender: element.gender,
                    phone: element.phone,
                };
                const Q2 = "INSERT INTO web.Users SET ?";
                sql.query(Q2, NewCsvData, (err, mysqlres) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("create row successfully!");
                    }
                });
            });
            console.log("csv insert users succes!!!");
        });
};

const selectUsers = () => {
    const Q3 = "SELECT * FROM web.Users";
    sql.query(Q3, (err, mysqlres) => {
        if (err) {
            console.log("error", err);
            return;
        }
        console.log("Selected users:", mysqlres);
        return;
    });
};

const CreateEmployees = () => {
    const Q5 = `
        CREATE TABLE IF NOT EXISTS web.Employees(
            name VARCHAR(50) NOT NULL, 
            lastName VARCHAR(50) NOT NULL, 
            email VARCHAR(150) NOT NULL, 
            userName VARCHAR(50) NOT NULL, 
            password VARCHAR(30) NOT NULL, 
            city VARCHAR(50) NOT NULL, 
            gender VARCHAR(10) NOT NULL, 
            phone VARCHAR(50) NOT NULL, 
            Seniority INT, 
            HourlyRate INT, 
            PRIMARY KEY (phone)
        );`;
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            // res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log("created table Employees");
        // res.send("table created");
        return;
    });
};

const insertEmployees = (req, res) => {
    const csvPath = path.join(__dirname, "../content/employees.csv");
    csv()
        .fromFile(csvPath)
        .then((jsonObj) => {
            jsonObj.forEach((element) => {
                console.log(element);
                var NewCsvData = {
                    name: element.name,
                    lastName: element.lastName,
                    email: element.email,
                    userName: element.userName,
                    password: element.password,
                    city: element.city,
                    gender: element.gender,
                    phone: element.phone,
                    Seniority: element.Seniority,
                    HourlyRate: element.HourlyRate,
                };
                const Q6 = "INSERT INTO web.Employees SET ?";
                sql.query(Q6, NewCsvData, (err, mysqlres) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("create row successfully!");
                    }
                });
            });
            console.log("csv insert employees succes!!!");
        });
};

const selectEmployees = () => {
    const Q7 = "SELECT * FROM web.Employees";
    sql.query(Q7, (err, mysqlres) => {
        if (err) {
            console.log("error", err);
            return;
        }
        console.log("Selected Employees:", mysqlres);
        return;
    });
};

const CreateCustomerService = () => {
    const Q9 = `
    CREATE TABLE IF NOT EXISTS web.customerService(
        name VARCHAR(50) NOT NULL, 
        lastName VARCHAR(50) NOT NULL, 
        contactType VARCHAR(50) NOT NULL, 
        phone VARCHAR(50) NOT NULL, 
        report TEXT, 
        PRIMARY KEY (phone)
    );`;
    sql.query(Q9, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            // res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log("created table customerservice");
        // res.send("table created");
        return;
    });
};

const insertCustomerService = (req, res) => {
    const csvPath = path.join(__dirname, "../content/customerservice.csv");
    csv()
        .fromFile(csvPath)
        .then((jsonObj) => {
            jsonObj.forEach((element) => {
                console.log(element);
                var NewCsvData = {
                    name: element.name,
                    lastName: element.lastName,
                    contactType: element.contactType,
                    phone: element.phone,
                    report: element.report,
                };
                const Q10 = "INSERT INTO web.customerService SET ?";
                sql.query(Q10, NewCsvData, (err, mysqlres) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("create row successfully!");
                    }
                });
            });

            console.log("csv insert CustomerService succes!!!");
        });
};

const selectCustomerService = () => {
    const Q11 = "SELECT * FROM web.customerService";
    sql.query(Q11, (err, mysqlres) => {
        if (err) {
            console.log("error", err);
            return;
        }
        console.log("Selected customer service entries:", mysqlres);
        return;
    });
};

const CreateSearches = () => {
    const Q13 = `
    CREATE TABLE IF NOT EXISTS web.Searches(
        userPhone VARCHAR(50), 
        employeePhone VARCHAR(50), 
        PRIMARY KEY (userPhone, employeePhone)
    );`;
    sql.query(Q13, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            // res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log("created table searches");
        // res.send("table created");
        return;
    });
};
const insertSearches = () => {
    const csvPath = path.join(__dirname, "../content/searches.csv");
    csv()
        .fromFile(csvPath)
        .then((jsonObj) => {
            jsonObj.forEach((element) => {
                console.log(element);
                var NewCsvData = {
                    userPhone: element.userPhone,
                    employeePhone: element.employeePhone,
                };
                const Q14 = "INSERT INTO web.Searches SET ?";
                sql.query(Q14, NewCsvData, (err, mysqlres) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("create row successfully!");
                    }
                });
            });
            console.log("csv insert Searches succes!!!");
        });
};

const selectSearches = () => {
    const Q15 = "SELECT * FROM web.Searches";
    sql.query(Q15, (err, mysqlres) => {
        if (err) {
            console.log("error", err);
            return;
        }
        console.log("Selected searches:", mysqlres);
        return;
    });
};

const dropDatabase = () => {
    const Q16 = "DROP DATABASE IF EXISTS web";
    sql.query(Q16, (err, mysqlres) => {
        if (err) {
            console.log("error", err);
            return;
        }
        console.log("Dropped db web");
        return;
    });
};

createDatabase = () => {
    CreateDb();
    CreateUsers();
    CreateEmployees();
    CreateCustomerService();
    CreateSearches();

    insertUsers();
    insertEmployees();
    insertCustomerService();
    insertSearches();
};

module.exports = {
    createDatabase,
    dropDatabase,
    selectSearches,
    selectEmployees,
    selectCustomerService,
    selectUsers,
    insertSearches,
};
