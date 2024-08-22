const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('buttons')
		.setDescription('Display Buttons'),
	async execute(interaction) {
		const primary = new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('Primary')
			.setStyle(ButtonStyle.Primary);

		const secondary = new ButtonBuilder()
			.setCustomId('secondary')
			.setLabel('Secondary')
			.setStyle(ButtonStyle.Secondary);
        
        const success = new ButtonBuilder()
			.setCustomId('success')
			.setLabel('Success')
			.setStyle(ButtonStyle.Success);

		const danger = new ButtonBuilder()
			.setCustomId('danger')
			.setLabel('Danger')
			.setStyle(ButtonStyle.Danger);

        const link = new ButtonBuilder()
			.setLabel('Link')
            .setURL('https://discord.js.org')
			.setStyle(ButtonStyle.Link);

		const row = new ActionRowBuilder()
			.addComponents(primary, secondary, success, danger, link);

		await interaction.reply({ 
			components: [row] 
		});
	},
};