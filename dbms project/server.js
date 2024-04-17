const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));
app.use("/images", express.static("images"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "d_p"
});

connection.connect(function(error){
    if (error) throw error;
    else console.log("Connected to the database successfully!");
});

// Route to serve the booking form
// Route to serve the booking form
app.get("/aboutus.html", function(req, res){
    res.sendFile(__dirname + "/aboutus.html");
});
app.get("/admin_user.html", function(req, res){
    res.sendFile(__dirname + "/admin_user.html");
});
app.get("/contact.html", function(req, res){
    res.sendFile(__dirname + "/contact.html");
});

app.get("/faq.html", function(req, res){
    res.sendFile(__dirname + "/faq.html");
});
app.get("/index.html", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.get("/login.html", function(req, res){
    res.sendFile(__dirname + "/login.html");
});
app.get("/signup.html", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.get("/welcome.html", function(req, res){
    res.sendFile(__dirname + "/welcome.html");
});
app.get("/xplore.html", function(req, res){
    res.sendFile(__dirname + "/xplore.html");
});

app.get("/book.html", function(req, res){
    res.sendFile(__dirname + "/book.html");
});
// Route to handle booking form submission
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
        if (error) {
            console.error("Error querying the database:", error);
            res.status(500).send("Error processing the request");
        } else {
            if (results.length > 0) {
                res.redirect("/welcome");
            } else {
                const insertQuery = "INSERT INTO bookings (location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const insertValues = [location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position];

                connection.query(insertQuery, insertValues, function(error, results, fields){
                    if (error) {
                        console.error("Error inserting data into the database:", error);
                        res.status(500).send("Error processing the request");
                    } else {
                        res.redirect("/feedback");
                    }
                });
            }
        }
    });
});

// Route to serve the welcome page
app.get("/welcome", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

// Route to serve the feedback form
app.get("/feedback", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

// Route to serve the signup page
app.get("/signup", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

// Handle signup form submission
app.post("/signup", encoder, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        res.status(400).send("Password and confirm password do not match.");
        return;
    }

    // Insert the new user into the database
    connection.query("INSERT INTO signupuser (user_name, user_email, user_pass,user_confirmpass) VALUES (?,?,?, ?)", [username, email, password,confirmPassword], function (error, results, fields) {
        if (error) {
            console.error("Error inserting new user:", error);
            res.status(500).send("An error occurred while signing up. Please try again later.");
            return;
        }
        res.redirect("/welcome");
    });
});

// Route to handle feedback form submission
app.post("/submit_feedback", encoder, function(req, res){
    var user_id = req.body.user_id;
    var cycle_id = req.body.cycle_id; // Assuming you have a form field for cycle_id
    var rating = req.body.rating;
    var comments = req.body.comments;

    const insertFeedbackQuery = "INSERT INTO feedback (user_id, cycle_id, rating, comments) VALUES (?, ?, ?, ?)";
    const feedbackValues = [user_id, cycle_id, rating, comments];

    connection.query(insertFeedbackQuery, feedbackValues, function(error, results, fields){
        if (error) {
            console.error("Error inserting feedback into the database:", error);
            res.status(500).send("Error processing the request");
        } else {
            console.log("Feedback submitted successfully");
            res.redirect("/welcome");
        }
    });
});

// Set the app port
app.listen(4000, function(){
    console.log("Server is running on port 4000");
});
