'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
      User.hasMany(models.Like)
      User.belongsToMany(models.Post, { through: `PostLike` })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Username is Required`
        }, notEmpty: {
          msg: `Username is Required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is Required`
        }, notEmpty: {
          msg: `Email is Required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        }, notEmpty: {
          msg: `Password is Required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Role is Required`
        }, notEmpty: {
          msg: `Role is Required`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash;
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};