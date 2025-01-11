const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Crea un mensaje embed personalizado')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option.setName('titulo')
                .setDescription('Título del embed')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('descripcion')
                .setDescription('Descripción del embed')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('color')
                .setDescription('Color hexadecimal del embed (#FF0000)'))
        .addStringOption(option => 
            option.setName('imagen')
                .setDescription('URL de la imagen para el embed'))
        .addStringOption(option => 
            option.setName('miniatura')
                .setDescription('URL de la miniatura'))
        .addStringOption(option => 
            option.setName('campo1_nombre')
                .setDescription('Nombre del primer campo'))
        .addStringOption(option => 
            option.setName('campo1_valor')
                .setDescription('Valor del primer campo'))
        .addStringOption(option => 
            option.setName('footer')
                .setDescription('Texto del pie de página')),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ Solo los administradores pueden usar este comando.', ephemeral: true });
        }

        const titulo = interaction.options.getString('titulo');
        const descripcion = interaction.options.getString('descripcion');
        const color = interaction.options.getString('color') || '#0099ff';
        const imagen = interaction.options.getString('imagen');
        const miniatura = interaction.options.getString('miniatura');
        const campo1_nombre = interaction.options.getString('campo1_nombre');
        const campo1_valor = interaction.options.getString('campo1_valor');
        const footer = interaction.options.getString('footer');

        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(descripcion)
            .setColor(color)
            .setTimestamp();

        if (imagen) embed.setImage(imagen);
        if (miniatura) embed.setThumbnail(miniatura);
        if (campo1_nombre && campo1_valor) {
            embed.addFields({ name: campo1_nombre, value: campo1_valor, inline: true });
        }
        if (footer) embed.setFooter({ text: footer });

        await interaction.reply({ embeds: [embed] });
    },
};
