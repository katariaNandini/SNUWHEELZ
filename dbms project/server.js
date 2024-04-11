const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
//app.use("/assets",express.static("assets"));

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
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var mobileno = req.body.mobileno;
  var location = req.body.location;
  var cycle = req.body.cycle;

  const selectQuery = "SELECT * FROM ContactForm WHERE first_name = ? AND last_name = ? AND email = ? AND mobile_no = ? AND selected_location = ? AND selected_cycle = ?";
  const selectValues = [firstname, lastname, email, mobileno, location, cycle];

  connection.query(selectQuery, selectValues, function(error, results, fields){
      if (results.length > 0) {
          res.redirect("/welcome");
      } else {
          const insertQuery = "INSERT INTO ContactForm (first_name, last_name, email, mobile_no, selected_location, selected_cycle) VALUES (?, ?, ?, ?, ?, ?)";
          const insertValues = [firstname, lastname, email, mobileno, location, cycle];

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
    res.sendFile(__dirname + "/welcome.html")
})


// set app port
app.listen(4000);