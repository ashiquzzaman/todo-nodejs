
var { Todo } = require('../models/model.todo');
var { database } = require('../db/database');
var { authenticate } = require('../middleware/authenticate');
const { ObjectID } = require('mongodb');

module.exports = app => {

    // create new todo
    app.post('/todos', authenticate, (req, res) => {
        var todo = new Todo({
            text: req.body.text,
            _creator: req.user._id
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });

    // todo list
    app.get('/todos', authenticate, (req, res) => {
        Todo.find({
            _creator: req.user._id
            //deleted: false
        }).then((todos) => {
            res.send({ todos });
        }, (e) => {
            res.status(400).send(e);
        });
    });

    // get single todo
    app.get('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Todo.findOne({
            _id: id,
            //deleted: false,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        });
    });

};