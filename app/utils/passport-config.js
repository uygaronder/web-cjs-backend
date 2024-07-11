const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure passport to use the LocalStrategy for email and username logins
passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'username',
        },
        (email, password, done) => {
            
        }
    )
);

// Configure passport to use the GoogleStrategy for Google logins
passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: 'YOUR_GOOGLE_CLIENT_ID',
            clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
            callbackURL: 'YOUR_GOOGLE_CALLBACK_URL',
        },
        (accessToken, refreshToken, profile, done) => {
            // Implement your authentication logic here
            // Call done() with the user object if authentication is successful
            // Call done() with false if authentication fails
        }
    )
);

module.exports = passport;