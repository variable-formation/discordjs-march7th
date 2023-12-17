const {
	Events,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
} = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.customId == 'cosmetic') {
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

			const row = new ActionRowBuilder().setComponents(stringMenu);


			const role = interaction.guild.roles.cache.get(interaction.values[0]);
			if (!role) {
				interaction.update({
					components: [row],
				});

				await interaction.member.send(`I'm having a bit of trouble currently, could you try again later?`)
				return;
			}

			const hasRole = interaction.member.roles.cache.has(role.id);

			try {
				if (hasRole) {
					await interaction.member.roles.remove(role);
					await interaction.update({
						components: [row],
					});

					await interaction.member.send(`The role ${role.name} has been removed from you.`);
					return;
				}
			}
			catch (error) {
				console.log(error);
			}


			try {
				await interaction.member.roles.add(role);
				await interaction.update({
					components: [row],
				});
				await interaction.member.send(`The role ${role.name} has been added to you.`);
			}
			catch (error) {
				console.log(error);
			}
		}

		if (interaction.customId == 'pronouns') {
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


			const role = interaction.guild.roles.cache.get(interaction.values[0]);
			if (!role) {
				interaction.update({
					components: [row],
				});

				await interaction.member.send(`I'm having a bit of trouble currently, could you try again later?`)
				return;
			}

			const hasRole = interaction.member.roles.cache.has(role.id);

			try {
				if (hasRole) {
					await interaction.member.roles.remove(role);
					await interaction.update({
						components: [row],
					});

					await interaction.member.send(`The role ${role.name} has been removed from you.`);
					return;
				}
			}
			catch (error) {
				console.log(error);
			}


			try {
				await interaction.member.roles.add(role);
				await interaction.update({
					components: [row],
				});
				await interaction.member.send(`The role ${role.name} has been added to you.`);
			}
			catch (error) {
				console.log(error);
			}
		}

		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};