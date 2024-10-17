const { SlashCommandBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movemessage')
		.setDescription('Moves a message to a specific channel.')
		.addStringOption(option => 
			option.setName('message_id')
				.setDescription('The ID of the message to move')
				.setRequired(true))
		.addChannelOption(option => 
			option.setName('channel')
				.setDescription('The channel to move the message to')
				.setRequired(true)),
	async execute(interaction) {
		const messageId = interaction.options.getString('message_id');
		const channel = interaction.options.getChannel('channel');
        
		try {
			// Fetch the message from the original channel
			const fetchedMessage = await interaction.channel.messages.fetch(messageId); 
			// Send the message content to the target channel
            const author = fetchedMessage.author;
			await channel.send({
				content: `Message from ${fetchedMessage.author}: ${fetchedMessage.content}`,
				embeds: fetchedMessage.embeds,
				files: fetchedMessage.attachments.map(attachment => attachment.url)
			});

			// Optionally, delete the original message if you want to "move" it
			await fetchedMessage.delete();

			await interaction.reply(`Moved the message to ${channel}.`);
		} catch (error) {
			console.error(error);
			await interaction.reply('There was an error moving the message. Please check the message ID and channel.');
		}
	},
};