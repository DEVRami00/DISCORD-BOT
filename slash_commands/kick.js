const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa a un miembro del servidor.')
        .addUserOption(option =>
            option.setName('miembro')
                .setDescription('El miembro que quieres expulsar')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('razón')
                .setDescription('Razón de la expulsión')
                .setRequired(false)
        ),
    async execute(interaction) {
        const member = interaction.options.getMember('miembro');
        const reason = interaction.options.getString('razón') || 'No se proporcionó ninguna razón.';
        const logChannelId = '1325566586429636752'; // Cambia esto con el ID de tu canal de logs

        if (!member) {
            return interaction.reply({ content: 'Este miembro no se encuentra en el servidor.', flags: 64 }); // Flag "ephemeral"
        }

        if (!interaction.guild.members.me.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: 'No tengo permisos para expulsar miembros.', flags: 64 });
        }

        if (member.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({ content: 'No puedo expulsar a este miembro porque tiene un rol más alto que el mío.', flags: 64 });
        }

        if (member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Staff')) {
            return interaction.reply({ content: 'No puedes expulsar a un miembro con rol de administrador o staff.', flags: 64 });
        }

        await interaction.deferReply();

        try {
            await member.kick(reason);

            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('¡Expulsado con éxito!')
                .setDescription(`Has expulsado exitosamente a ${member.user.tag}.`)
                .setFooter({ text: 'Acción ejecutada por ' + interaction.user.tag })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed], flags: 64 });

            const logEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Miembro Expulsado')
                .setDescription(`${member.user.tag} ha sido expulsado del servidor.`)
                .addFields(
                    { name: 'Razón', value: reason },
                    { name: 'Expulsado por', value: interaction.user.tag }
                )
                .setFooter({ text: 'Registro de expulsión' })
                .setTimestamp();

            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                await logChannel.send({ embeds: [logEmbed] });
            } else {
                console.error('Canal de logs no encontrado.');
            }

        } catch (error) {
            console.error('Error al expulsar al miembro:', error);
            if (!interaction.replied && !interaction.deferred) {
                return interaction.reply({ content: 'Hubo un error al intentar expulsar al miembro.', flags: 64 });
            }
        }
    },
};
