// Ensure environment variables are loaded before other modules
require('dotenv').config();
const App = require('./utils/app')
const app = new App(3025)