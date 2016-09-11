/**
 * Fichier de définition du module de connection Sequelize.
 */

exports.name = 'sequelizeModule';
exports.version = '0.1';

exports.install = function(){
  // Définitions des variables d'options

  var database_name_option = 'database.name';
  var username_database_option = 'database.username';
  var password_database_option = 'database.password';
  var host_database_option = 'database.host';
  var dialect_database_option = 'database.dialect';
  var pool_database_option = 'database.pool';
  var storage_path_database_option = 'database.storage.path';

  // Récupération des options depuis les fichiers de configurations de Total.
  var database_name = CONFIG(database_name_option);
  var username_database = CONFIG(username_database_option);
  var password_database = CONFIG(password_database_option);
  var host_database = CONFIG(host_database_option);
  var dialect_database = CONFIG(dialect_database_option);
  var pool_database = CONFIG(pool_database_option);
  var storage_path_database = CONFIG(storage_path_database_option);

  // Connection à la base de données grâce à Sequelize.
  var Sequelize = require('sequelize');
  F.Sequelize = Sequelize;
  F.sequelize = new Sequelize(database_name, username_database, password_database, {
    host: host_database,
    dialect: dialect_database,
    pool : pool_database
  });
}
