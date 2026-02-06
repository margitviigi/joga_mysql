// Load environment variables FIRST before importing anything else
require('dotenv').config();

const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Import routes
const articleRoutes = require('./routes/article');
app.use('/', articleRoutes);

// Start the server
const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
