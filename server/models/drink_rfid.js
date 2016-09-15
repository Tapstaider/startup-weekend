// Création du modèle de la table Drink_rfid.

var Drink_rfid = F.sequelize.define('drink_rfid', {
  id: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  rfid: {
    type: F.Sequelize.STRING,
    allowNull: false
  },
  id_beer: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    references: { model: "beer", key: "id" }
  },
  capacity: {
    type: F.Sequelize.FLOAT,
    allowNull: false,
    comment: "Capacity of the drink in cL"
  }
}, {
  freezeTableName : true
});

Drink_rfid.sync().then(function() {
  // Table crée ou mise à jour
  exports.name = 'drink_rfid';
  exports.Schema = Drink_rfid;
});
