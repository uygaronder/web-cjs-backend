import { generateAuthToken } from '../utils/generateAuthToken';

module.exports = {
    subject: 'Welcome to our app',
    text: `Thanks for signing up to our app! We hope you enjoy your stay. Your authentication token is ${generateAuthToken().authToken}`
};