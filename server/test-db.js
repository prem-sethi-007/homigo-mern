// Quick connectivity check for MongoDB Atlas: `npm run db:test`
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

async function testConnection() {
  try {
    await connectDB();
    const { databases } = await mongoose.connection.db.admin().listDatabases();
    console.log('SUCCESS: Connected to MongoDB!');
    console.log('Database in use:', mongoose.connection.name);
    console.log('Databases on cluster:', databases.map((d) => d.name).join(', '));
  } catch (error) {
    console.error('CONNECTION FAILED');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

testConnection();
