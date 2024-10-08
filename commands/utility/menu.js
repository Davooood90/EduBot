const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, UserSelectMenuBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Display Menu')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('The first argument')
                .setRequired(true)),

	async execute(interaction) {
        const menu_type = interaction.options.getString('type');
        if (menu_type.toLowerCase() === 'dropdown') {
            const select = new StringSelectMenuBuilder()
                .setCustomId('starter')
                .setPlaceholder('Make a selection!')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Bulbasaur')
                        .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                        .setValue('bulbasaur'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Charmander')
                        .setDescription('The Fire-type Lizard Pokémon.')
                        .setValue('charmander'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Squirtle')
                        .setDescription('The Water-type Tiny Turtle Pokémon.')
                        .setValue('squirtle'),
                );
            const row = new ActionRowBuilder()
                .addComponents(select);

            await interaction.reply({
                content: 'Choose your starter!',
                components: [row],
            });
        } else if (menu_type.toLowerCase() === 'multi-select') {
            const userSelect = new UserSelectMenuBuilder()
                .setCustomId('users')
                .setPlaceholder('Select multiple users.')
                .setMinValues(1)
                .setMaxValues(10);

            const row1 = new ActionRowBuilder()
                .addComponents(userSelect);

            await interaction.reply({
                content: 'Select users:',
                components: [row1],
            });
        };
		
	},
};