const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Setup middleware
app.use(cors());
app.use(bodyParser.json());

// Setup MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'leonel', // Ganti dengan username Anda
  password: '', // Ganti dengan password Anda
  database: 'finpro_database', // Nama database Anda
  port: 3306
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Route untuk mengambil data item
app.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err });
    }
    res.json(results);
  });
});

// Route untuk menambahkan item baru
app.post('/items', (req, res) => {
  const { name, quantity, description } = req.body;
  const query = 'INSERT INTO items (name, quantity, description) VALUES (?, ?, ?)';
  db.query(query, [name, quantity, description], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding item', error: err });
    }
    res.status(201).json({ message: 'Item added successfully', id: result.insertId });
  });
});

// Route untuk memperbarui item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity, description } = req.body;
  const query = 'UPDATE items SET name = ?, quantity = ?, description = ?';
  db.query(query, [name, quantity, description, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating item', error: err });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// Route untuk menghapus item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM items WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting item', error: err });
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// Route untuk mengambil data customer
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err });
    }
    res.json(results);
  });
});

// Route untuk menambahkan customer baru
app.post('/customers', (req, res) => {
  const { name, email, phone, address } = req.body;
  const query = 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, address], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding customer', error: err });
    }
    res.status(201).json({ message: 'Customer added successfully', id: result.insertId });
  });
});

// Route untuk memperbarui customer
app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  const query = 'UPDATE customers SET name = ?, email = ?, phone = ?, address = ?';
  db.query(query, [name, email, phone, address, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating customer', error: err });
    }
    res.json({ message: 'Customer updated successfully' });
  });
});

// Route untuk menghapus customer
app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM customers';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting customer', error: err });
    }
    res.json({ message: 'Customer deleted successfully' });
  });
});

// Route untuk mengambil data staff
app.get('/staff', (req, res) => {
  db.query('SELECT * FROM staff', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err });
    }
    res.json(results);
  });
});

// Route untuk menambahkan staff baru
app.post('/staff', (req, res) => {
  const { name, email, role, phone } = req.body;
  const query = 'INSERT INTO staff (name, email, role, phone) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, role, phone], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding staff', error: err });
    }
    
    res.status(201).json({ message: 'Staff added successfully', id: result.insertId });
  });
});

// Route untuk memperbarui staff
app.put('/staff/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, phone } = req.body;
  const query = 'UPDATE staff SET name = ?, email = ?, role = ?, phone = ?';
  db.query(query, [name, email, role, phone, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating staff', error: err });
    }
    res.json({ message: 'Staff updated successfully' });
  });
});

// Route untuk menghapus staff
app.delete('/staff/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM staff';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting staff', error: err });
    }
    res.json({ message: 'Staff deleted successfully' });
  });
});

// Tambahkan error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
