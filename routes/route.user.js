var { User } = require('../models/model.user');
var { database } = require('../db/database');
var { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');


module.exports = app => {

    //public, authentication: no
    /** login */
    app.post('/users/login', (req, res) => {

        var body = _.pick(req.body, ['email', 'password']);

        User.findByCredentials(body.email, body.password).then((user) => {
            
            return user.generateAuthToken().then((token) => {
                res.header('xauth', token).send(user);
            });
        }).catch((e) => {
            res.status(400).send(e);
        });

    });

    /** registration */
    app.post('/users/registration', (req, res) => {

        var body = _.pick(req.body, ['email', 'password']);
        
        var user = new User(body);

        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('xauth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });

    });

    //private, authentication: yes
    /** user info */
    app.get('/users/me', authenticate, (req, res) => {
        res.status(200).send(req.user);
    });

};