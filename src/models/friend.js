'use strict';

module.exports = (sequelize, DataTypes) => {
  var friends = sequelize.define('friends', {
    name: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return friends;
};
