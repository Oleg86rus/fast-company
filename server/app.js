const express = require('express');
const config = require('config');
const chalk = require('chalk');
const cors = require('cors');
const mongoose = require('mongoose')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const app = express();
const path = require('path')



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api', routes);


const PORT = config.get('port') ?? 8080;

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client')))
	
	const indexPath = path.join(__dirname, 'client', 'index.html')
	
	app.get('*', (req, res) => {
		res.sendFile(indexPath)
	})
}

async function start() {
	try {
		mongoose.connection.once('open', () => {
			console.log(chalk.green(`MongoDB connected!`));
			initDatabase();
		})
		await mongoose.connect(config.get('mongoUri'));
		app.listen(8080, () => {
			console.log(chalk.green(`Server has been started on port ${PORT}`));
		})
	} catch (e) {
		console.log(chalk.red(e.message));
		process.exit(1);
	}

}

start()