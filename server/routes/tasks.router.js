const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool.js');

// GET all tasks
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

// POST a new task
tasksRouter.post('/', (req, res) => {
    let queryText = `
    INSERT INTO tasks ("description", "complete", "date_due")
    VALUES ($1, $2, $3);`;

    let values = [req.body.description, req.body.complete, req.body.dateDue];

    pool.query(queryText, values).then(result => {
        res.sendStatus(201);
    }).catch( err => {
        res.sendStatus(500);
    });
})


module.exports = tasksRouter;