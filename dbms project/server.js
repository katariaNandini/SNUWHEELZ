const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
 app.use("/assets",express.static("assets"));
// app.use("/styles", express.static("styles")); // Serve the book.css file

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "d_p"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/book.html");
})

app.post("/", encoder, function(req, res){
    var location = req.body['select-location'];
    var start_datetime = req.body['start_datetime'];
    var end_datetime = req.body['end_datetime'];
    var userID = req.body.userID;
    var email = req.body.email;
    var name = req.body.name;
    var department = req.body.department;
    var year = req.body.year;
    var major = req.body.major;
    var title = req.body.title;
    var position = req.body.position;

    const selectQuery = "SELECT * FROM bookings WHERE location = ? AND start_datetime = ? AND end_datetime = ? AND userID = ? AND email = ? AND name = ? AND department = ? AND year = ? AND major = ? AND title = ? AND position = ?";
    const selectValues = [location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position];

    connection.query(selectQuery, selectValues, function(error, results, fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            const insertQuery = "INSERT INTO bookings (location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const insertValues = [location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position];

            connection.query(insertQuery, insertValues, function(error, results, fields){
                if (error) throw error;
                res.redirect("/welcome");
                res.end();
            });
        }
    });
});

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/index.html")
});

// set app port
app.listen(4000);
