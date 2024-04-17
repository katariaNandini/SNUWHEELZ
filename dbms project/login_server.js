// // Import required modules
// const express = require('express');
// const mysql = require('mysql');

// // Create Express application
// const app = express();

// // Set up MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: "root",
//   password: "1234",
//   database: "d_p"
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('MySQL Connected');
// });

// // Serve the login HTML file at the root URL
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/login.html');
// });

// // Middleware to parse incoming requests with JSON payloads
// app.use(express.json());

// // Serve static files (like HTML, CSS, JS)
// app.use(express.static('public'));

// // Route for handling login form submission
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   // Perform query to check username and password
//   const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//   db.query(sql, [username, password], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid username and/or password' });
//     }
//     // Login successful
//     res.status(200).json({ message: 'Login successful' });
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
