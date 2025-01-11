const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Muestra el avatar de un usuario.')
    .addUserOption(option => 
      option.setName('usuario')
        .setDescription('El usuario del que quieres ver el avatar')
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const user = interaction.options.getUser('usuario') || interaction.user;

    const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const avatarExtension = avatarUrl.split('.').pop().toUpperCase();

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${user.username}`)
      .setDescription(`Aquí está el avatar de **${user.username}**`)
      .setImage(avatarUrl)
      .addFields(
        { name: 'Usuario', value: `${user.tag}`, inline: true },
        { name: 'Tipo de Imagen', value: `**${avatarExtension}**`, inline: true },
        { name: 'Tamaño', value: `1024x1024 px`, inline: true },
        { name: 'URL Directa', value: `[Haz clic aquí](${avatarUrl})`, inline: false }
      )
      .setFooter({
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 64 })
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
