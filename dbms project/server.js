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
    database: "dbms_project"
});

connection.connect(function(error){
    if (error) throw error;
    else console.log("Connected to the database successfully!");
});
app.get("/payment.html", function(req, res){
    res.sendFile(__dirname + "/payment.html");
});
app.get("/aboutus.html", function(req, res){
    res.sendFile(__dirname + "/aboutus.html");
});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/admin_user.html");
});
// app.get("/admin.html", function(req, res){
//     res.sendFile(__dirname + "/admin.html");
// });
app.get("/adminlogin.html", function(req, res){
    res.sendFile(__dirname + "/adminlogin.html");
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
// Handle admin login authentication
// Route to handle admin login form submission
// Handle admin login authentication
app.post("/adminlogin", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // Check if username and password are correct (this is just an example, actual implementation should involve database validation)
    if (username === "user" && password === "web_dev") {
        // Authentication successful, redirect to admin page
        res.redirect("/admin.html");
    } else {
        // Authentication failed, redirect back to the login page with an error message
        res.redirect("/adminlogin.html?error=invalidCredentials");
    }
});


app.get('/admin.html', (req, res) => {
    connection.query('SELECT * FROM cycle_status', (error, results) => {
      if (error) {
        throw error;
      }
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <link rel="stylesheet" href="assets/admin_portal.css">

          <title>Cycle Status</title>
        </head>
        <body>
          <h1>Cycle Status</h1>
          <table border="1">
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Cycles Available</th>
              <th>Cycles Rented</th>
              <th>Cycles Maintenance</th>
            </tr>
            ${results.map(row => `
              <tr>
                <td>${row.id}</td>
                <td>${row.location_name}</td>
                <td>${row.cycles_available}</td>
                <td>${20 - row.cycles_available}</td>
                <td>${row.cycles_maintenance}</td>
              </tr>
            `).join('')}
          </table>
        </body>
        </html>
      `);
    });
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

    const insertQuery = "INSERT INTO bookings (bookings.location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertValues = [location, start_datetime, end_datetime, userID, email, name, department, year, major, title, position];

    connection.query(insertQuery, insertValues, function(error, results, fields){
        if (error) {
            console.error("Error inserting data into the database:", error);
            res.status(500).send("Error processing the request");
        } else {
            res.redirect("/welcome");
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
// Handle signup form submission
// Handle signup form submission
// Handle signup form submission
app.post("/signup", encoder, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        // Redirect back to the signup page with an error query parameter
        res.redirect("/signup?error=passwordMismatch");
        return;
    }
    
    // Insert the new user into the database
    const insertUserQuery = "INSERT INTO signupuser (username, email, password) VALUES (?, ?, ?)";
    const userValues = [username, email, password];

    connection.query(insertUserQuery, userValues, function(error, results, fields){
        if (error) {
            console.error("Error inserting user into the database:", error);
            res.status(500).send("Error processing the request");
        } else {
            console.log("User signed up successfully");
            res.redirect("/welcome");
        }
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
const PORT = process.env.PORT || 3000; // Use the port provided by the environment or fallback to 3000

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});



