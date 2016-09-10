// Création du modèle de la table Consumption.

var Consumption = F.sequelize.define('consumption', {
  id: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    references: '_user',
    referencesKey: 'id'
  },
  id_drink_rfid: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    references: 'drink_rfid',
    referencesKey: 'id'
  },
  weight: {
    type: F.Sequelize.FLOAT
  }
}, {
  freezeTableName: true
});

Consumption.sync().then(function(){
  // Table Crée ou mise à jour
  exports.name = 'consumption';
  exports.Schema = Consumption;
});
