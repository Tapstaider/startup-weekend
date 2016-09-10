// Création du model de la table Bar.

var Bar = F.sequelize.define('bar', {
  id: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: F.Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName : true
});

Bar.sync().then(function() {
  // Table Crée ou mise à jour
  exports.name = 'bar';
  exports.Schema = Bar;
});
