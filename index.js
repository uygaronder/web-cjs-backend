require('dotenv').config();
require("./app/utils/db.connect.js");
require("./app/utils/cloudinary.js");

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);