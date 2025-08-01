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
    static getBalance(id) {
      let data = UserProfile.findByPk(id)
      return data.balance
    }
    static async buyProduct(id, buy, price) {
      let totalPrice = price * buy;
      const profile = await UserProfile.findByPk(id)
      const newBalance = profile.balance - totalPrice;
      const result = await UserProfile.update({
         balance: newBalance 
        },
        { where: {
           id 
        },
        }
      )
      return result
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
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};