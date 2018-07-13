/* Routing for app.html file */

const express = require('express');
const router = new express.Router();
// const mongooseRoom = require('../models/mongoose/vms');

/* TODO: Template */
router.get('/some/path', function(req, res) {
    console.log('[index.html] : POST request to /some/path');
});

/* TODO: Template */
router.get('/:paramName/extra', function(req, res) {
    console.log('[index.html] : POST request to /' + req.params.paramName + '/extra');

    /* DEPRECATED */
});

module.exports = router;
