const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
	if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {
			quotes: result
		});
	});
});

app.post('/quotes',(req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);

		console.log('saved to database');
		res.redirect('/');
	})
});

MongoClient.connect('mongodb://denistoledo:mngdb01012016@ds027175.mlab.com:27175/homer-simpson-quotes', (err, database) => {
	if (err) return console.log(err);

	db = database;

	app.listen(3000, function() {
		db.collection('quotes').find().toArray(function(err, results) {
			app.set('view engine', 'ejs')
		});
	});
});
