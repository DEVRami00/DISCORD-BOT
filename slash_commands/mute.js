const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Silencia a un miembro del servidor.')
        .addUserOption(option =>
            option.setName('miembro')
                .setDescription('El miembro que quieres silenciar')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Obtener el miembro
        const member = interaction.options.getMember('miembro');
        const logChannelId = '1325566586429636752'; // Cambia esto con el ID de tu canal de logs
        const muteRoleName = 'muteado'; // Nombre del rol de muteo
        const staffRole = 'staff'; // Nombre del rol de staff

        if (!interaction.member.roles.cache.some(role => role.name === staffRole)) {
            return interaction.reply({ content: 'No tienes permiso para ejecutar este comando. Necesitas el rol de "staff".', flags: 64 });
        }

        if (!member) {
            return interaction.reply({ content: 'Este miembro no se encuentra en el servidor.', flags: 64 });
        }

        if (!interaction.guild.members.me.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'No tengo permisos para gestionar roles.', flags: 64 });
        }

        const muteRole = interaction.guild.roles.cache.find(role => role.name === muteRoleName);
        if (!muteRole) {
            return interaction.reply({ content: `No se encuentra el rol "${muteRoleName}" en el servidor.`, flags: 64 });
        }

        await interaction.deferReply();


        try {
            await member.roles.set([muteRole.id]);


            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Miembro Silenciado')
                .setDescription(`${member.user.tag} ha sido muteado.`)
                .setFooter({ text: 'Acción ejecutada por ' + interaction.user.tag })
                .setTimestamp();

            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                await logChannel.send({ embeds: [embed] });
            }

            await interaction.editReply({ content: `Has muteado a ${member.user.tag} con éxito.`, flags: 64 });

        } catch (error) {
            console.error('Error al muteado al miembro:', error);
            await interaction.editReply({ content: 'Hubo un error al intentar silenciar al miembro.', flags: 64 });
        }
    },
};
