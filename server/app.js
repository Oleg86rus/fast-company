const express = require('express');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

// if (process.env.NODE_ENV === 'production') {
// 	console.log('Production')
// } else {
// 	console.log('Development')
// }

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