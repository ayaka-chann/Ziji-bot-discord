const { CommandInteraction } = require('discord.js');
const config = require('../../config');

module.exports.data = {
  name: 'leaveserver',
  description: 'Leave a server by ID',
  type: 1,
  options: [
    {
      name: 'server_id',
      description: 'The ID of the server to leave',
      type: 3, // STRING
      required: true,
    },
  ],
  integration_types: [0],
  contexts: [0],
  owner: true,
};

/**
 * @param {CommandInteraction} interaction
 */
module.exports.execute = async interaction => {
  if (!config.OwnerID.includes(interaction.user.id)) return;

  const serverId = interaction.options.getString('server_id');
  const guild = interaction.client.guilds.cache.get(serverId);

  if (!guild) {
    return interaction.reply({ content: 'Server not found.', ephemeral: true });
  }

  try {
    await guild.leave();
    await interaction.reply({ content: `Successfully left the server: ${guild.name}`, ephemeral: true });
  } catch (error) {
    console.error('Error leaving server:', error);
    await interaction.reply({ content: 'An error occurred while trying to leave the server.', ephemeral: true });
  }
};
