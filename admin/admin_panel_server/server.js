const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Middleware for handling CORS
app.use(cors());

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'vehiclerental'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'images')); // Use path.join
    },
    filename: function (req, file, cb) {

        const ext = path.extname(file.originalname); // Get the file extension
  
        const filename = uuidv4() + ext; // Generate a unique filename using uuid
  
        cb(null, filename);
  
    }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());

// Route to fetch all vehicles
app.get('/vehicles', (req, res) => {
    const sql = 'SELECT * FROM vehicles';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching vehicles: ', err);
            res.status(500).json({ error: 'Error fetching vehicles' });
            return;
        }
        res.json(results);
    });
});

// Route to add a new vehicle
app.post('/vehicles', upload.single('image'), (req, res) => {
    const { category_id, title, description, per_day_price, no_of_seats, added_by, rating } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : ''; // Get the path of the uploaded image
    console.log('Image URL:', image_url); // Log the image URL
    const sql = 'INSERT INTO vehicles (category, title, description, per_day_price, image_url, no_of_seats, added_by, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [category_id, title, description, per_day_price, image_url, no_of_seats, added_by, rating], (err, result) => {
        if (err) {
            console.error('Error adding vehicle: ', err);
            res.status(500).json({ error: 'Error adding vehicle' });
            return;
        }
        res.status(201).json({ success: true, message: 'Vehicle added successfully' });
    });
});

app.put('/vehicles/:id', (req, res) => {
    const id = req.params.id;
    const updatedVehicle = req.body;

    const sql = 'UPDATE vehicles SET title = ?, description = ?, no_of_seats = ?, image_url = ?, category = ?, added_by = ?, rating = ?, per_day_price = ? WHERE vehicle_id = ?';
    const params = [updatedVehicle.title, updatedVehicle.description, updatedVehicle.no_of_seats, updatedVehicle.image_url, updatedVehicle.category, updatedVehicle.added_by, updatedVehicle.rating, updatedVehicle.per_day_price, id];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating vehicle: ', err);
            res.status(500).json({ error: 'Error updating vehicle' });
            return;
        }
        res.status(200).json({ success: true, message: 'Vehicle updated successfully' });
    });
});

// Route to delete a vehicle
app.delete('/vehicles/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM vehicles WHERE vehicle_id = ?';
    
    connection.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting vehicle: ', err);
            res.status(500).json({ error: 'Error deleting vehicle' });
            return;
        }
        res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
