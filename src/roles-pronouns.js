const { token } = require('./config.json');

const {
	Client,
	IntentsBitField,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} = require('discord.js');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on('ready', async (c) => {
	try {
		const channel = client.channels.cache.get('1166664414699737108');

		const stringMenu = new StringSelectMenuBuilder()
			.setMinValues(0)
			.setMaxValues(1)
			.setPlaceholder('Add your pronouns!')
			.setCustomId('pronouns')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('fae/faer')
					.setValue('1168050578845343784'),
				new StringSelectMenuOptionBuilder()
					.setLabel('he/him')
					.setValue('1168050091563683870'),
				new StringSelectMenuOptionBuilder()
					.setLabel('she/her')
					.setValue('1168050143405285466'),
				new StringSelectMenuOptionBuilder()
					.setLabel('they/them')
					.setValue('1168050181770588160'),
				new StringSelectMenuOptionBuilder()
					.setLabel('it/its')
					.setValue('1168050368748462170'),
			);

		const row = new ActionRowBuilder().setComponents(stringMenu);


		await channel.send({
			components: [row],
		});

		return;
	}
	catch (error) {
		console.log(error);

		return;
	}
});

client.login(token);
