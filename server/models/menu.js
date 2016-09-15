// Création du modèle de la table Menu.

var Menu = F.sequelize.define('menu', {
  id: {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  price : {
    type: F.Sequelize.FLOAT,
    allowNull: false
  },
  id_bar : {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    references: { model: "bar", key: "id" }
  },
  id_beer : {
    type: F.Sequelize.BIGINT,
    allowNull: false,
    references: { model: "beer", key: "id" }
  }
}, {
  freezeTableName: true
});

Menu.sync().then(function() {
  // Table crée ou mise à jour
  exports.name = 'menu';
  exports.Schema = Menu;
});
