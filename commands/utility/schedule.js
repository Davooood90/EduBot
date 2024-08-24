const { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle,  StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

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
                .setRequired(true)),
	async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        
        const eventType = new StringSelectMenuBuilder()
            .setCustomId('eventType')
            .setPlaceholder('Select Event Type')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Stage Channel')
                    .setDescription('Great for large community audio events.')
                    .setValue('stage'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Voice Channel')
                    .setDescription('Hang out with voice, video, screenshare, and Go Live.')
                    .setValue('voice'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Text Channel')
                    .setDescription('A place to chill and text.')
                    .setValue('text'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Somewhere Else')
                    .setDescription('External link or in-person location.')
                    .setValue('other'),
            );
        const row = new ActionRowBuilder()
            .addComponents(eventType);
        
        const response = await interaction.reply({
            content: 'What type of event is this?',
            components: [row],
        });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 30_000 });

        collector.on('collect', async i => {
            // eventType.setDisabled(true);
            // row.setComponents(eventType);
            // // Respond to the interaction
            // await i.update({
            //     content: `You selected: ${i.values[0]} for event: **${name}** with description: **${description}**`,
            //     components: [row] // Remove the select menu
            // });
            const modal = new ModalBuilder()
                .setCustomId('scheduleModal')
                .setTitle('Schedule an Event');

            const locationInput = new TextInputBuilder()
                .setCustomId('location')
                .setLabel("Location")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Enter the location');

            const startDateTimeInput = new TextInputBuilder()
                .setCustomId('startDateTime')
                .setLabel("Start Date and Time")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('YYYY-MM-DD HH:MM');

            const endDateTimeInput = new TextInputBuilder()
                .setCustomId('endDateTime')
                .setLabel("End Date and Time")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('YYYY-MM-DD HH:MM');

            const locationRow = new ActionRowBuilder().addComponents(locationInput);
            const startRow = new ActionRowBuilder().addComponents(startDateTimeInput);
            const endRow = new ActionRowBuilder().addComponents(endDateTimeInput);

            modal.addComponents(locationRow, startRow, endRow);

            await i.showModal(modal);
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({
                    content: 'You did not select any event type in time!',
                    components: [],
                });
            }
        });

	},
};

        // console.log(typeof(location))
        // try {
        //     const event = await interaction.guild.scheduledEvents.create({
        //         name,
        //         scheduledStartTime: new Date(Date.now() + startInMinutes * 60 * 1000),
        //         scheduledEndTime: new Date(Date.now() + (startInMinutes + durationMinutes) * 60 * 1000),
        //         privacyLevel: 2,
        //         entityType: 3,
        //         description,
        //         entityMetadata: {
        //             location: location,
        //         },
        //     });

        //     await interaction.reply(`Event "${event.name}" created successfully!`);
        // } catch (error) {
        //     console.error('Error creating event:', error);
        //     await interaction.reply('There was an error while creating the event!');
        // }