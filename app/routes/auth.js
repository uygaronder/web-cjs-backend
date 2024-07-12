const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('../utils/nodemailer');

const sendAuthenticationEmail = async (email, token) => {
    const subject = 'Authentication';
    await nodemailer.sendMail(email, subject, './mailTemplates/authMailTemplate', { token });
}

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

module.exports = router;