const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rollusers')
    .setDescription('Command that randomly rolls users and splits them into two teams')
    .addStringOption(option =>
        option
        .setName('playing_users')
        .setDescription('Please provide exactly 10 nicknames.')
        .setRequired(true)),
        async execute(interaction) {
            const playingUsers = interaction.options
              .getString('playing_users')
              .replace(/\s+/g, ' ')
              .trim()
              .split(' ');
            await interaction.deferReply();
            if (playingUsers.length !== 10) {
                await interaction.editReply('**Error**: Please provide exactly 10 nicknames. Currently there are ' + `${playingUsers.length}` + ' players');
            }

            else {
                playingUsers.sort(() => Math.random() - 0.5);
                const team1 = playingUsers.slice(0, 5);
                const team2 = playingUsers.slice(5);
                await interaction.editReply('😻 We have 2 teams for today match ' + '\n' + `**Team 1:** ${team1.join(' ')}` + `\n` + '\n' + `**Team 2:** ${team2.join(' ')}`);
            }

        }

}