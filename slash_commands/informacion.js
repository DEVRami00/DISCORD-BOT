const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('informacion')
    .setDescription('Muestra información detallada del servidor'),

  async execute(interaction) {
    await interaction.deferReply();

    const guild = interaction.guild;
    const owner = await guild.fetchOwner();
    const bots = guild.members.cache.filter(member => member.user.bot).size;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Información del Servidor')
      .setDescription('**Detalles sobre el servidor de desarrollo.**')
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        { name: 'Dueño', value: `**${owner.user.tag}**`, inline: true },
        { name: 'Fecha de Creación', value: `<t:${Math.floor(guild.createdAt / 1000)}:f>`, inline: true },
        { name: 'Cantidad de Bots', value: `**${bots}**`, inline: true },
        { name: 'Miembros Totales', value: `**${guild.memberCount}**`, inline: true },
      )
      .addFields(
        { name: '\u200b', value: '**==============================================================**' }
      )
      .addFields(
        { name: 'Web', value: '(https://desarrollo.com)', inline: true },
        { name: 'IP', value: '123.456.789.0', inline: true },
        { name: 'X', value: 'https://x.com/__x', inline: true },
        { name: 'Información Adicional', value: 'Aquí puedes agregar más detalles relevantes del servidor.', inline: false }
      )
      .setFooter({
        text: 'Información proporcionada por el servidor de desarrollo',
        iconURL: 'https://i.imgur.com/AfFp7pu.png'
      });

    await interaction.editReply({ embeds: [embed] });
  },
};
