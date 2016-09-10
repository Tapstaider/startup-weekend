// Création du modèle de la table User.

var User = F.sequelize.define('_user', {
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
  email: {
    type: F.Sequelize.STRING,
    allowNull: false
  },
  weight: {
    type: F.Sequelize.FLOAT,
    allowNull: false
  },
  tall: {
    type: F.Sequelize.FLOAT,
    allowNull: false
  },
  password: {
    type: F.Sequelize.STRING,
    allowNull: false
  },
  consumption_updated_at: {
    type: F.Sequelize.DATE
  }
}, {
  freezeTableName: true
});

User.sync().then(function(){
  // Table crée ou mise à jour
  exports.name = 'user';
  exports.Schema = User;
});
