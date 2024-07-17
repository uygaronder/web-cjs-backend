require('dotenv').config();
require("./app/utils/db.connect.js");
require("./app/utils/cloudinary.js");

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/*const userRouter = require("./app/routes/user.route.js");
const postRouter = require("./app/routes/post.route.js");
const commentRouter = require("./app/routes/comment.route.js");
const likeRouter = require("./app/routes/like.route.js");
const followRouter = require("./app/routes/follow.route.js");
const messageRouter = require("./app/routes/message.route.js");
const notificationRouter = require("./app/routes/notification.route.js");
const chatRouter = require("./app/routes/chat.route.js");*/
const apiRouter = require("./app/routes/api.route.js");

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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);