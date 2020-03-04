const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const app = express();

const PORT = process.env.PORT || 4000;

const hbs = require('express-handlebars');

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// connect to database
connectDB();

// routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/url'));

app.get('/', async (req, res) => {
	res.render('index');
});

// app.post('/', async (req, res) => {

// })

app.listen(PORT, () => console.log(`// ${PORT}...`));
