const mongoose = require('mongoose');
const db = mongoose.connection;

console.log('MONGO_CONNECTION_URI: ', process.env.MONGO_CONNECTION_URI);
const mongoURI = process.env.ENV==='development' ? 'mongodb://localhost:27017/' + 'mydb' : process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));