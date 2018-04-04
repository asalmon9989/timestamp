const express = require('express');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const app = express();
const dateJson = function(date) {
	return {'unix': date.getTime(),
			'natural': months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()};
}

const nullDate = function() {
	return {'unix': null,
			'natural': null};
}


//Middleware
app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/:date', function(req, res) {
	let date;
	if (parseInt(req.params.date)) {
		date = new Date(Number(req.params.date));
	}
	else {
		date = new Date(req.params.date);
	}

	if (date.toString() === 'Invalid Date') {
		res.send(nullDate());
	}
	else {
		res.send(dateJson(date));
	}
});
app.listen(8080);