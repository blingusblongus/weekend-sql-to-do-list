const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool.js');

tasksRouter.get('/', (req, res) => {
    let queryText = `
    SELECT * FROM tasks;`;

    pool.query(queryText).then( result => {
        res.send(result.rows);
    }).catch( err => {
        console.log('/tasks GET error', err);
        res.sendStatus(500);
    });
});


module.exports = tasksRouter;