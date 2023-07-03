const express = require("express");
const app = express();
const path = require("path");
const BodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const sql = require("./db");

const addUserSearch = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const NewSearch = {
        userPhone: req.cookies.loggedInUser.phone,
        employeePhone: req.body.employeePhone,
    };
    // run insert query
    const Q1 = "insert into web.Searches set ?";
    sql.query(Q1, NewSearch, (err, mysqlres) => {
        console.log("added search", req.body);
        res.send({ message: "thank you!" });
        return;
    });
};

const CreateNewUser = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const NewUser = {
        name: req.body["First-Name"],
        lastName: req.body["Last-Name"],
        email: req.body.Email,
        userName: req.body.UserName,
        password: req.body.Password,
        city: req.body.City,
        gender: req.body.gender,
        phone: req.body.phone,
    };
    // run insert query
    const Q1 = "insert into web.Users set ?";
    sql.query(Q1, NewUser, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err: "Sign up failed" });
            return;
        }
        console.log("created new user", req.body);
        res.send({ message: "thank you!" });
        //res.sendFile(path.join(__dirname, '../views/search.html'));
        // res.redirect('/');
        return;
    });
};

const CreateNewEmployee = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const NewEmployee = {
        name: req.body["First-Name"],
        lastName: req.body["Last-Name"],
        email: req.body.Email,
        userName: req.body.UserName,
        password: req.body.Password,
        city: req.body.City,
        gender: req.body.gender,
        phone: req.body.phone,
        Seniority: parseInt(req.body.Seniority),
        HourlyRate: parseInt(req.body["Hourly-Rate"]),
    };
    // run insert query
    const Q2 = "insert into web.Employees set ?";
    sql.query(Q2, NewEmployee, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err: "Sign up Employee failed" });
            return;
        }
        console.log("created new Employee", req.body);
        res.send({ message: "thank you!" });
        //res.sendFile(path.join(__dirname, '../views/search.html'));
        // res.redirect('/');
        return;
    });
};

const CreateNewRequest = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const newRequest = {
        name: req.body.name,
        lastName: req.body.lastName,
        contactType: req.body.text,
        phone: req.body.phone,
        report: req.body.report,
    };
    // run insert query
    const Q3 = "insert into web.customerService set ?";
    sql.query(Q3, newRequest, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err: "Request failed" });
            return;
        }
        console.log("created new Request", req.body);
        res.send({ message: "thank you!" });
        return;
    });
};

const loginUser = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    console.log(req.body);

    const userName = req.body.UserName;
    const password = req.body.Password;
    const user = `SELECT * from web.users WHERE userName = '${userName}' AND password = '${password}' LIMIT 1`;

    console.log(user);

    sql.query(user, (err, records, fields) => {
        if (records && records[0]) {
            const user = JSON.parse(JSON.stringify(records[0]));
            res.cookie("loggedInUser", user);
            res.cookie("loggedInUserType", "user");
            res.redirect("/");
        } else {
            const employee = `SELECT * from web.employees WHERE userName = '${userName}' AND password = '${password}' LIMIT 1`;
            sql.query(employee, (err, records, fields) => {
                if (records && records[0]) {
                    const employee = JSON.parse(JSON.stringify(records[0]));
                    res.cookie("loggedInUser", employee);
                    res.cookie("loggedInUserType", "employee");
                    res.redirect("/");
                } else {
                    console.log("error: ", err);
                    res.redirect("/login?error=User was not found");
                }
            });
        }
    });
};

const logoutUser = function (req, res) {
    res.clearCookie("loggedInUser");
    res.redirect("/");
};

const SearchByUserPhone = function (req, res) {
    const user = req.cookies["loggedInUser"];
    const query = `
        SELECT s.*, e.name, e.lastName, e.email, e.city, e.gender, e.Seniority, e.HourlyRate
        FROM web.Searches as s
        JOIN web.Employees as e ON s.employeePhone = e.phone 
        WHERE s.userPhone = '${user.phone}'`;

    console.log(sql);

    sql.query(query, (err, records, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send("Request failed");
        } else {
            const results = JSON.parse(JSON.stringify(records));
            res.status(200).send(results);
        }
    });
};

const SearchEmployeesByLocation = function (req, res) {
    const { city } = req.query;
    console.log(city);
    const query = `
        SELECT * FROM web.Employees WHERE city LIKE "%${city}%"`;

    sql.query(query, (err, records, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send({err: "Request failed"});
        } else {
            const results = JSON.parse(JSON.stringify(records));
            res.status(200).send(results);
        }
    });
};

module.exports = {
    loginUser,
    logoutUser,
    addUserSearch,
    CreateNewUser,
    CreateNewEmployee,
    CreateNewRequest,
    SearchByUserPhone,
    SearchEmployeesByLocation,
};
