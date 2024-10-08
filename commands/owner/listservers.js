const { CommandInteraction, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports.data = {
  name: 'listservers',
  description: 'List all servers the bot is in',
  type: 1,
  options: [],
  integration_types: [0],
  contexts: [0],
  owner: true,
};

/**
 * @param {CommandInteraction} interaction
 */
module.exports.execute = async interaction => {
  if (!config.OwnerID.includes(interaction.user.id)) return;

  await interaction.deferReply({ ephemeral: true });

  const servers = interaction.client.guilds.cache.map(guild => ({
    name: guild.name,
    id: guild.id,
    memberCount: guild.memberCount,
  }));

  const embed = new EmbedBuilder()
    .setTitle('Servers List')
    .setColor('Blue')
    .setDescription(
      servers.map(server => `**${server.name}** (ID: ${server.id}) - Members: ${server.memberCount}`).join('\n')
    )
    .setFooter({ text: `Total Servers: ${servers.length}` })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
};
