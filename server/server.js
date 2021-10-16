const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.router.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// Routes
app.use('/task', taskRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

