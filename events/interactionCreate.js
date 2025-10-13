import fs from 'fs';
const dbFile = './database/db.json';

export default {
  name: 'interactionCreate',
  async execute(interaction) {
    const db = JSON.parse(fs.readFileSync(dbFile));
    const painel = db.painel || {};

    if (interaction.isStringSelectMenu()) {
      
      if (interaction.customId === 'selecionarCargo') {
        if (interaction.user.id !== interaction.guild.ownerId) 
          return interaction.reply({ content: 'Somente o dono pode selecionar o cargo permitido.', ephemeral: true });

        painel.cargoPermitido = interaction.values[0];
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return interaction.reply({ content: `Cargo permitido atualizado para <@&${painel.cargoPermitido}>.`, ephemeral: true });
      }

      if (interaction.customId === 'selecionarCanal') {
        if (interaction.user.id !== interaction.guild.ownerId &&
            (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido))) {
          return interaction.reply({ content: 'Você não tem permissão.', ephemeral: true });
        }

        painel.canalLogs = interaction.values[0];
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return interaction.reply({ content: `Canal de logs atualizado para <#${painel.canalLogs}>.`, ephemeral: true });
      }
      
      if (interaction.customId === 'selecionarCategoria') {
        if (interaction.user.id !== interaction.guild.ownerId &&
            (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido))) {
          return interaction.reply({ content: 'Você não tem permissão.', ephemeral: true });
        }

        painel.categoriaCarrinhos = interaction.values[0];
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return interaction.reply({ content: `Categoria dos carrinhos atualizada para <#${painel.categoriaCarrinhos}>.`, ephemeral: true });
      }
    }
  }
};
