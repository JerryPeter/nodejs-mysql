const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/image');

app.use(bodyParser.json());

app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);

module.exports = app;