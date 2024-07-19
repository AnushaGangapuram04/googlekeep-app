const express = require('express');
const cors = require('cors');
const app = require('./app');

// Middleware
app.use(cors());
app.use(express.json());

// Set port
const PORT = process.env.PORT || 3001;
app.set('port', PORT);

// Start server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
