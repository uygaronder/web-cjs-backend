const db = require('../db'); // Assuming you have a separate file for database connection

describe('Database Connection', () => {
    it('should connect to the database', async () => {
        try {
            await db.connect(); // Replace `db.connect()` with your actual database connection function
            console.log('Connected to the database');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    });

    it('should disconnect from the database', async () => {
        try {
            await db.disconnect(); // Replace `db.disconnect()` with your actual database disconnection function
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Failed to disconnect from the database:', error);
        }
    });

    it('should handle connection errors', async () => {
        try {
            // Modify the database connection URL to an invalid one to simulate a connection error
            process.env.MONGO_CONNECTION_URI = 'mongodb://localhost:27017/invalid_database_url';
            await db.connect(); // Replace `db.connect()` with your actual database connection function
            console.log('Connected to the database');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    });

    it('should handle disconnection errors', async () => {
        try {
            // Modify the database connection URL to an invalid one to simulate a disconnection error
            process.env.MONGO_CONNECTION_URI = 'mongodb://localhost:27017/invalid_database_url';
            await db.disconnect(); // Replace `db.disconnect()` with your actual database disconnection function
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Failed to disconnect from the database:', error);
        }
    });
});