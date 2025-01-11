const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    once: true,

    async execute(client, member) {
        console.log(`Nuevo miembro: ${member.user.username}`);

        const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);
        if (!welcomeChannel) {
            console.error('No se encontró el canal de bienvenida');
            return;
        }

        const background = await loadImage('https://i.imgur.com/AfFp7pu.png');
        const canvas = createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const buffer = canvas.toBuffer();
        const attachment = new AttachmentBuilder(buffer, { name: 'welcome-image.png' });

        const embed = new EmbedBuilder()
            .setTitle('¡Bienvenido a la Comunidad!')
            .setColor('#0099ff')
            .setDescription(`
                ¡Hola <@${member.id}>, te damos la bienvenida! 🎉
                Asegúrate de leer las reglas en <#${config.rulesChannelId}> y presentarte en <#${config.introChannelId}>.
                Si tienes alguna pregunta, no dudes en preguntar. ¡Disfruta de tu estancia!
            `)
            .setImage('attachment://welcome-image.png')
            .setFooter({ text: '¡Nos alegra tenerte con nosotros!', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setTimestamp();

        try {
            await welcomeChannel.send({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error('Error enviando el mensaje de bienvenida:', error);
        }

        const role = member.guild.roles.cache.get(config.newMemberRoleId);
        if (role) {
            try {
                await member.roles.add(role);
                console.log(`Rol "Nuevo Miembro" asignado a ${member.user.username}`);
            } catch (error) {
                console.error('Error asignando rol:', error);
            }
        }
    }
};
