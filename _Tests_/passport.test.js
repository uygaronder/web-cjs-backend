const chai = require('chai');
const chaiHttp = require('chai-http');
const passport = require('passport');
const app = require('../app'); // Replace with the path to your app file
const User = require('../models/user'); // Replace with the path to your User model

chai.use(chaiHttp);
const expect = chai.expect;

describe('Passport Authentication', () => {
    // Create a test user
    const testUser = new User({
        username: 'testuser',
        password: 'testpassword'
    });

    before(async () => {
        // Save the test user to the database
        await testUser.save();
    });

    after(async () => {
        // Remove the test user from the database
        await User.deleteOne({ username: 'testuser' });
    });

    it('should authenticate a valid user', (done) => {
        chai.request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Authentication successful');
                done();
            });
    });

    it('should not authenticate an invalid user', (done) => {
        chai.request(app)
            .post('/login')
            .send({ username: 'invaliduser', password: 'invalidpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').equal('Authentication failed');
                done();
            });
    });
});