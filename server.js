import app from './src/app.js';
import connectDB from './src/config/database.config.js';
import config from './src/config/configs.js';

const BASE_PORT = parseInt( config.PORT || '3000', 10);
const MAX_PORT_ATTEMPTS = 10;

// Connect to database with error handling
connectDB().catch((err) => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});

// Start server
const startServer = (port, attempts = 0) => {
  // Limit port increment attempts
  if (attempts >= MAX_PORT_ATTEMPTS) {
    console.error(`Could not find available port after ${MAX_PORT_ATTEMPTS} attempts`);
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`✓ Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1, attempts + 1);
    } else {
      console.error(`✗ Server error: ${err.message}`);
      process.exit(1);
    }
  });
};

startServer(BASE_PORT);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing server');
  process.exit(0);
});