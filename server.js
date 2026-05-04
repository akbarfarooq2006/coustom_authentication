import app from './src/app.js';
import connectDB from './src/config/database.config.js';
import config from './src/config/configs.js';

const PORT = config.PORT || 3000;


connectDB().catch((err) => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});


//  run app.listen or also ensure if one port is busy it it used differnet port
  app.listen(PORT, (err) => {
    if (err == "EADDRINUSE") {
      app.listen(PORT + 1, () => {
        console.log(`Port ${PORT} is busy, server is running on port ${PORT + 1}`);
      } );
    }
    console.log(`Server is running on port ${PORT}`);
  });


