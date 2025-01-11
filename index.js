const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const { connectToDatabase } = require('./database/mongo');

const client = new discord.Client({
    intents: 53608447,
});

client.commands = new discord.Collection();

connectToDatabase();


fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    client.commands.set(command.data.name, command);
});

const eventsPath = './events';
fs.readdirSync(eventsPath).forEach(file => {
    const event = require(`${eventsPath}/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
});

const REST = new discord.REST().setToken(config.token);

(async () => {
    try {
        await REST.put(
            discord.Routes.applicationGuildCommands(config.clientId, config.guildId),
            {
                body: client.commands.map((cmd) => cmd.data.toJSON()),
            }
        );
    } catch (error) {
        console.log("Error loading commands.", error);
    }
})();

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        command.execute(interaction).catch(console.log);
    }
});

client.login(config.token);
