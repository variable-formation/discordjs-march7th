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
        .setName('rxddit') // Set the command name to 'ping'.
        .setDescription('Replaces a Reddit URL with rxddit.') // Set the command description.
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

        if (link.startsWith("https://www.reddit.com")) {
            link = link.replace("https://www.reddit.com", "https://www.rxddit.com");
            interaction.editReply({ content: link, components: [row], ephemeral: false });
        } else {
            interaction.editReply({ content: "That's not a Reddit link!", ephemeral: false });
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