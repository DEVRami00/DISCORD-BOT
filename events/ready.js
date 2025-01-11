const chalk = require('chalk');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(chalk.gray('==============================='));

    console.log(chalk.green(`¡Bot listo! Conectado como ${client.user.tag}`));

    const eventsLoaded = client.events ? client.events.length : 0;
    const commandsLoaded = client.commands ? client.commands.size : 0;

    console.log(chalk.blue(`Eventos cargados: ${eventsLoaded}`));
    console.log(chalk.yellow(`Comandos cargados: ${commandsLoaded}`));

    console.log(chalk.gray('==============================='));

    console.log(chalk.blue(`Total de eventos cargados: ${eventsLoaded}`));
    console.log(chalk.yellow(`Total de comandos cargados: ${commandsLoaded}`));
  },
};
