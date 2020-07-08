if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT;

const hbs = require('express-handlebars');

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to database
connectDB();

// routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/url'));

app.get('/', async (req, res) => {
	res.render('index', { server: '{ Your Url will be placed here 🚀 }' });
});

app.listen(PORT, () => console.log(`// ${PORT}...`));
