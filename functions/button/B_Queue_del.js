const { useQueue } = require('discord-player');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ButtonInteraction, ActionRowBuilder } = require('discord.js');
module.exports.data = {
  name: 'B_queue_del',
  type: 'button',
};

/**
 * @param { object } button - object button
 * @param { ButtonInteraction } button.interaction - button interaction
 * @param { import('../../lang/vi.js') } button.lang - language
 * @returns
 */

module.exports.execute = async ({ interaction, lang }) => {
  const modal = new ModalBuilder()
    .setTitle(`Delete Track ${interaction?.guild?.name}`)
    .setCustomId('M_Queue_del')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('del-input')
          .setPlaceholder('Track Number')
          .setLabel('Track Number ex: 1,3,4...')
          .setStyle(TextInputStyle.Short)
          .setRequired(true),
      ),
    );
  await interaction.showModal(modal);
  return;
};