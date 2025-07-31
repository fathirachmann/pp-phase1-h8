'use strict';
//BCryptJS Password Hashing
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'UserId'
      })

      User.hasOne(models.UserProfile, {
        foreignKey: 'UserId'
      })

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [8],
          msg: 'username must be at least 6 characters long'
        },
        notEmpty: {
          agrs: true,
          msg: 'username is required'
        },
        notNull: {
          agrs: true,
          msg: 'username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          agrs: true,
          msg: 'E-mail is required'
        },
        notNull: {
          agrs: true,
          msg: 'E-mail is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          agrs: [8],
          msg: 'password must be at least 6 characters long'
        },
      }
    },
    role: DataTypes.STRING // by default setiap User yang register role = User
  }, {
    hooks: {
      beforeCreate(User, options) { // Bcrypt create password hashing
        User.password = bcrypt.hash(User.password, salt),
        User.role = 'user'
      },
      beforeUpdate(User, options) { // Bcrypt change password hashing
        if (User.changed('password')) {
          User.password = bcrypt.hash(User.password, salt)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};