'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    imageProfile: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'Not enough balance'
        },
        addBalance(value) {
          if (value < 10000) {
            throw new Error('Top up minimum amount is Rp. 10.000,00 ')
          }
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.name = 'User'
        instance.address = 'Set your address'
        instance.balance = 0
        instance.imageProfile = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
      },
      beforeUpdate(instance, options) {

      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};