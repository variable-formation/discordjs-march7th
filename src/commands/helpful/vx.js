const {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
} = require('discord.js');

// Module exports for a Discord slash command.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vx') // Set the command name to 'ping'.
        .setDescription('Replaces a Twitter, X, or Nitter URL with vxtwitter.') // Set the command description.
        .addStringOption(option => option.setName('link').setDescription('The link to replace.').setRequired(true)),

    // Asynchronous function to be executed when the slash command is used.
    async execute(interaction) {
        // Send an initial reply to the user interaction and make it visible only to the user (ephemeral).
        let message = await interaction.deferReply({ content: 'Processing...', ephemeral: false });
        let link = interaction.options.getString('link');

        const deleteButton = new ButtonBuilder()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(deleteButton);

        if (link.startsWith("https://twitter.com")) {
            link = link.replace("https://twitter.com", "https://vxtwitter.com");
            interaction.editReply({ content: link, components: [row], ephemeral: false });
        } else if (link.startsWith("https://x.com")) {
            link = link.replace("https://x.com", "https://vxtwitter.com");
            interaction.editReply({ content: link, components: [row], ephemeral: false });
        } else if (link.startsWith("https://nitter.net")) {
            link = link.replace("https://nitter.net", "https://vxtwitter.com");
            interaction.editReply({ content: link, components: [row], ephemeral: false });
        } else if (link.startsWith("https://vxtwitter.com")) {
            interaction.editReply({ content: "That's already an vxtwitter link!", ephemeral: false });
        } else {
            interaction.editReply({ content: "That's not a Twitter, X, or Nitter link!", ephemeral: false });
        }

        const collectorFilter = i => {
            i.deferUpdate();
            return i.user.id === interaction.user.id;
        };

        message.awaitMessageComponent({ filter: collectorFilter, componentType: ComponentType.Button, time: 3_600_000 })
            .then(interaction => interaction.deleteReply())
            .catch(err => console.log('No interactions were collected.'));
    }
};