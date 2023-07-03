// import and set up
const express = require("express");
const app = express();
const path = require("path");
const BodyParser = require("body-parser");
const port = 3000;
const sql = require("./DB/db");
const createDB = require("./DB/createDB");
const CRUD = require("./DB/CRUD");
const cookieParse = require("cookie-parser");

app.use(cookieParse());
app.use(express.static(path.join(__dirname, "static")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//set up to csv reader
const csv = require("csvtojson");
//routing

app.get("/", (req, res) => {
    res.render("homePage");
});

app.get("/homePage", (req, res) => {
    res.render("homePage");
});
app.get("/aboutUs", (req, res) => {
    res.render("aboutUs");
});
app.get("/customerService", (req, res) => {
    res.render("customerService");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/myProfile", (req, res) => {
    if (req.cookies.loggedInUser) {
        res.render("myProfile");
    }
    res.render("login");
});
app.get("/preSignIn", (req, res) => {
    res.render("preSignIn");
});
app.get("/search", (req, res) => {
    res.render("search");
});
app.get("/signIn", (req, res) => {
    res.render("signIn");
});
app.get("/signInEmployee", (req, res) => {
    res.render("signInEmployee");
});

//forms filling
app.post("/formHandler", CRUD.CreateNewUser);
app.post("/formHandler1", CRUD.CreateNewEmployee);
app.post("/formHandler2", CRUD.CreateNewRequest);
app.post("/login", CRUD.loginUser);
app.get("/logout", CRUD.logoutUser);
app.get("/SearchByUserPhone", CRUD.SearchByUserPhone);
app.get("/SearchEmployeesByLocation", CRUD.SearchEmployeesByLocation);
app.post("/addUserSearch", CRUD.addUserSearch);

app.get("/formA", (req, res) => {
    console.log(req.query);
    res.cookie("UserName", req.query.UserName);
    // res.render('/formA',{Answer:""});
    res.redirect("homePage");
});

////////////////set up to datebase
//create database
app.get("/createDB", (req, res) => {
    res.send("all tables are created");
    createDB.createDatabase();
});

//drop all tables
app.get("/drop", (req, res) => {
    res.send("all tables are dropped");
    createDB.dropDatabase();
});

app.get("/insertSearches", (req, res) => {
    createDB.insertSearches();
    res.send("insertSearches");
});

// listen
app.listen(port, () => {
    console.log("server is running on port", port);

    // drop & create db
    createDB.dropDatabase();
    createDB.createDatabase();
});
