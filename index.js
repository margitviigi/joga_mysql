// Ensure environment variables are loaded before other modules
require('dotenv').config();

const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const App = require('./utils/app')
const app = new App(3025)

// Set up views and template engine
app.app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.app.set('views', path.join(__dirname, 'views'));
app.app.set('view engine', 'hbs');
app.app.use(express.static('public'));