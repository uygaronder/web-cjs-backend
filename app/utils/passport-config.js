const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const authenticateUser = async (email, password, done) => {
    try {
        const user = await User
            .findOne({ email: email })
            .exec();
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}

const serializeUser = (user, done) => {
    done(null, user.id);
}

const deserializeUser = async (id, done) => {
    try {
        const user = await User
            .findById(id)
            .exec();
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}

const googleCallback = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User
            .findOne({ email: profile.emails[0].value })
            .exec();
        if (user) {
            return done(null, user);
        }
        const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(16).toString('hex'),
        });
        await newUser.save();
        done(null, newUser);
    }
    catch (error) {
        done(error);
    }
}

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'username',
        },
        (email, password, done) => {
            authenticateUser(email, password, done);
        }
    )
);

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        (accessToken, refreshToken, profile, done) => {
            googleCallback(accessToken, refreshToken, profile, done);
        }
    )
);

module.exports = passport;