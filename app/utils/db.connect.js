const mongoose = require('mongoose');

const databaseUrl = process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017/your_database_url';

mongoose.connect(databaseUrl)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = mongoose;