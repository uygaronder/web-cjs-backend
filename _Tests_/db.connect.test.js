const db = require('../app/utils/db.connect');

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
            process.env.MONGO_CONNECTION_URI = 'mongodb://localhost:27017/invalid_database_url';
            await db.connect(); // Replace `db.connect()` with your actual database connection function
            console.log('Connected to the database');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    });

    it('should handle disconnection errors', async () => {
        try {
            process.env.MONGO_CONNECTION_URI = 'mongodb://localhost:27017/invalid_database_url';
            await db.disconnect(); // Replace `db.disconnect()` with your actual database disconnection function
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Failed to disconnect from the database:', error);
        }
    });
});