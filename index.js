require('dotenv').config();
require("./app/utils/db.connect.js");
require("./app/utils/cloudinary.js");

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.set("trust proxy", 1);

app.use(
    cors({
        origin: process.env.APP_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        exposedHeaders: ["Set-Cookie"],
    })
);

/*const userRouter = require("./app/routes/user.route.js");
const notificationRouter = require("./app/routes/notification.route.js");
const chatRouter = require("./app/routes/chat.route.js");*/
const apiRouter = require("./app/routes/api.route.js");
const authRouter = require("./app/routes/auth.route.js");

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

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);