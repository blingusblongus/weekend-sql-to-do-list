const { response } = require('express');
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
        console.log('add task success')
        res.sendStatus(201);
    }).catch( err => {
        console.log('add task err');
        res.sendStatus(500);
    });
});

tasksRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    
    let queryText = `
    DELETE FROM tasks
    WHERE id = $1;`;

    let values = [id];

    pool.query(queryText, values).then(response => {
        console.log('item deleted from db at id', id)
        res.sendStatus(204);
    }).catch(err => {
        console.log('error in DELETE', err)
        res.sendStatus(500);
    });
});

tasksRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let complete = req.body.complete === 'true' ?  false : true;

    let queryText = `
    UPDATE tasks
    SET complete = $1
    WHERE id = $2;`;

    let values = [complete, id];

    pool.query(queryText, values).then(result => {
        console.log('task updated to', complete, 'at id', id);
        res.sendStatus(200);
    }).catch(err => {
        console.log('error updating task at id ', id);
        res.sendStatus(500);
    });
});


module.exports = tasksRouter;