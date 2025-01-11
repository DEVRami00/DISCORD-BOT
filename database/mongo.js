const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('../config.json');

async function connectToDatabase() {
    try {
        await mongoose.connect(config.mongoURI, {
        });

        console.log(chalk.cyan.bold('🔵 Conexión exitosa a MongoDB!'));
        console.log(chalk.yellow('✅ Conectado correctamente a la base de datos MongoDB.'));
    } catch (error) {
        console.log(chalk.red.bold('❌ Error de conexión a MongoDB.'));
        console.log(chalk.red(`🔴 Error: ${error.message}`));
    }
}

module.exports = { connectToDatabase };
