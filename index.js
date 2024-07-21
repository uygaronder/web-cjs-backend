require('dotenv').config();
require("./app/utils/db.connect.js");
require("./app/utils/cloudinary.js");

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL || '*');
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

app.use(cookieParser());
app.use(session
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
    })
);

/*
const userRouter = require("./app/routes/user.route.js");
const notificationRouter = require("./app/routes/notification.route.js");
const chatRouter = require("./app/routes/chat.route.js");
*/
const apiRouter = require("./app/routes/api.route.js");
const authRouter = require("./app/routes/auth.route.js");

/*
app.use('/users', userRouter);
app.use('/notifications', notificationRouter);
app.use('/chats', chatRouter);
*/
app.use('/api', apiRouter);
app.use('/auth', authRouter);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

// test cookie
app.get('/set-cookie', (req, res) => { res.cookie('test', 'cookie value'); res.send('Cookie set successfully'); });app.get('/set-cookie', (req, res) => { res.cookie('test', 'cookie value'); res.send('Cookie set successfully'); });
app.get('/get-cookie', (req, res) => { res.send(req.cookies); });
app.get('/delete-cookie', (req, res) => { res.clearCookie('test'); res.send('Cookie deleted successfully'); });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);