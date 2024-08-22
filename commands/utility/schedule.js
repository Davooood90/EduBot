const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Manages Event Scheduling')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the event')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the event')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('start_in_minutes')
                .setDescription('Time until the event starts in minutes')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration_minutes')
                .setDescription('Duration of the event in minutes')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('location')
                .setDescription('The location where the event will take place')
                .setRequired(true)),
	async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const startInMinutes = interaction.options.getInteger('start_in_minutes');
        const durationMinutes = interaction.options.getInteger('duration_minutes');
        const location = interaction.options.getString('location');
        console.log(typeof(location))
        try {
            const event = await interaction.guild.scheduledEvents.create({
                name,
                scheduledStartTime: new Date(Date.now() + startInMinutes * 60 * 1000),
                scheduledEndTime: new Date(Date.now() + (startInMinutes + durationMinutes) * 60 * 1000),
                privacyLevel: 2,
                entityType: 3,
                description,
                entityMetadata: {
                    location: location,
                },
            });

            await interaction.reply(`Event "${event.name}" created successfully!`);
        } catch (error) {
            console.error('Error creating event:', error);
            await interaction.reply('There was an error while creating the event!');
        }
	},
};