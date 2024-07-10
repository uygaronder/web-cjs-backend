// configure dotnev
require('dotenv').config();
require("./app/db/db.connect.js");

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);