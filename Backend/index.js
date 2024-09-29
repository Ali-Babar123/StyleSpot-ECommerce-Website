const connectToMongo = require('./db');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const port = 3000;
connectToMongo();

// Enable CORS for a specific origin (in this case, your React app running on localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173' // Only allow requests from this specific origin
}));
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Use middleware to parse JSON request bodies
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'))

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
