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
			.setPlaceholder('Select a cosmetic role!')
			.setCustomId('cosmetic')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Blue')
					.setDescription('The blue color role.')
					.setValue('1166325335437082669'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Green')
					.setDescription('The green color role.')
					.setValue('1166325236543799316'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Orange')
					.setDescription('The orange color role.')
					.setValue('1166325401765806120'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Pink')
					.setDescription('The pink color role.')
					.setValue('1166325478949400597'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Purple')
					.setDescription('The purple color role.')
					.setValue('1166663873122816081'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Red')
					.setDescription('The red color role.')
					.setValue('1166325174979793007'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Yellow')
					.setDescription('The yellow color role.')
					.setValue('1166325716305059860')
			);

		// const row = new ActionRowBuilder().setComponents(roleMenu);
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
