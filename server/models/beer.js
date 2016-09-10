// Création du modèle de la table Beer

var Beer = F.sequelize.define('beer', {
  id: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: F.Sequelize.STRING,
    allowNull: false
  },
  degrease: {
    type: F.Sequelize.FLOAT
  },
  logo: {
    type: F.Sequelize.STRING
  },
  ratio: {
    type: F.Sequelize.FLOAT,
    allowNull: false,
    comment: "Allows conversion from weight to capacity in centiliter"
  }
}, {
  freezeTableName : true
});

Beer.sync().then(function() {
  // Table Crée ou mise à jour
  exports.name = 'beer';
  exports.Schema = Beer;
});
