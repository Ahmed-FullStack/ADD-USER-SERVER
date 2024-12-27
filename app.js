const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./users.js');
const time = require('./datStructuring.js');
const data = require('./data.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(
	cors({
		origin: 'http://127.0.0.1:5173',
	})
);

app.get('/html', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.use('/users', users);
app.use('/data', data);

mongoose.connect('mongodb://localhost:27017/usersThingy');
const ListSchema = new mongoose.Schema({
	listName: { type: String, required: true },
	age: { type: Number },
});
const List = new mongoose.model('User', ListSchema);
app
	.route('/')
	.get((req, res) => {
		List.find({}, (err, foundList) => {
			res.json(foundList);
		});
	})
	.post((req, res) => {
		console.log(req.body);
		const newList = new List({
			listName: req.body.listName,
		});
		newList.save(err => {
			if (!err) {
				res.json({ status: 200, ok: true });
			}
		});
	});

app.get('/another', (req, res) => {
	console.log(`normal route`);
	res.send(`<h3>notaonther</h3>`);
});
app.get('/another', (req, res) => {
	console.log(`another route`);
	res.send(`<h3>notaonther</h3>`);
});
app.get('/*', (req, res) => {
	console.log(`wildcard`);
	res.send(`<h3>Error </h3>`);
});

app.listen(3000);
