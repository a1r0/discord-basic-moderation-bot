const { SlashCommandBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Moves a message to a specific channel.')
		.addStringOption(option => 
			option.setName('amount')
				.setDescription('Amount of messages that needed to be moved')
				.setRequired(true)),
	async execute(interaction) {
        const amount = interaction.options.getString('amount')
        const messages = await interaction.channel.messages.fetch({limit: amount})
        const messagesArray = await Array.from(messages.values()).reverse();

		try {
			await interaction.deferReply()

            for(const msg of messagesArray) {
				await msg.delete();
            }

			await interaction.editReply('ℹ️' + `${messagesArray.length} ` +'Messages were removed')
            
		} catch (error) {
			console.error(error);
			await interaction.reply('There was an error moving the messages. Please check the amount and the channel.');
		}
	},
};