// Ensure environment variables are loaded before other modules
require('dotenv').config();

const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.use(express.static('public'));


const App = require('./utils/app')
const app = new App(3025)