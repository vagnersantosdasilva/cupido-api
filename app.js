const express = require('express');
const cors = require('cors')
const app = express();

const profilesRoute = require('./Routes/profiles.js');
const messages  = require('./Routes/messages');
const bodyParser = require("body-parser");
const usersRoute = require('./Routes/users.js');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/cupido',profilesRoute);
app.use('/cupido',messages);
app.use('/cupido/users',usersRoute);

//app.listen(3010);
module.exports = app;