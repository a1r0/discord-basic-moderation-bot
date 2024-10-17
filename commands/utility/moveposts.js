const { SlashCommandBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moveposts')
		.setDescription('Moves a message to a specific channel.')
		.addStringOption(option => 
			option.setName('amount')
				.setDescription('Amount of messages that needed to be moved')
				.setRequired(true))
		.addChannelOption(option => 
			option.setName('channel')
				.setDescription('The channel to move the message to')
				.setRequired(true)),
	async execute(interaction) {
        const amount = interaction.options.getString('amount')
        const messages = await interaction.channel.messages.fetch({limit: amount})
		const channel = await interaction.options.getChannel('channel');                
        const messagesArray = await Array.from(messages.values()).reverse();

		try {
			await interaction.deferReply()

            for(const msg of messagesArray) {
                await channel.send({
                    content: `ℹ️ Posted by ${msg.author}: ${msg.content}`,
                    embeds: msg.embeds,
                    files: msg.attachments.map(attachment => attachment.url)
                });
				await msg.delete();
            }

			await interaction.editReply('ℹ️ ' + `${messagesArray.length} ` +'Messages have been successfully moved!')
            
		} catch (error) {
			console.error(error);
			await interaction.reply('There was an error moving the messages. Please check the amount and the channel.');
		}
	},
};