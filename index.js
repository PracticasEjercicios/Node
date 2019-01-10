const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('./models/Perros');
mongoose.connect('conección a mLab');

app.use(bodyParser.json());

// require('./routes/personasRoutes')(app);
const perrosRoutes = require('./routes/perrosRoutes');
perrosRoutes(app);

app.listen(5000);