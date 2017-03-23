var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ntoe = require('../models/ntoe.js');

/* GET /ntoes listing. */
router.get('/', function(req, res, next) {
    Ntoe.find(function (err, todos) {
        if (err) return next(err);
        res.json(todos);
    });
});

/* GET /ntoes/id */
router.get('/:id', function(req, res, next) {
    Ntoe.findById(req.params.id, function (err, ntoe) {
        if (err) return next(err);
        res.json(ntoe);
    });
});

/* POST /ntoes */
router.post('/', function(req, res, next) {
    Ntoe.create(req.body, function (err, ntoe) {
        if (err) return next(err);
        res.json(ntoe);
    });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
    Ntoe.findByIdAndUpdate(req.params.id, req.body, {'new':true}, function (err, ntoe) {
        if (err) return next(err);
        res.json(ntoe);
    });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
    Ntoe.remove({id:req.params.id}, req.body, function (err) {
        if (err) return next(err);
    });
});


module.exports = router;