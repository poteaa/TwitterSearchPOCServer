const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const tweetsRoute = require('./routes/routes');
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', tweetsRoute.routes);

app.use((req, res, next) => {
    res.status(404).send();
});

app.listen(port);