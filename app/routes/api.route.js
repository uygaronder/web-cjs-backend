const express = require('express');

const router = express.Router();

router.get('/ping', (req, res) => {
    console.log('ping');
    res.json({ message: 'pong' });
});

module.exports = router;