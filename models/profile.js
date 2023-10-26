'use strict';
const {
  Model
} = require('sequelize');
const helper = require('../helper');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User)
    }
    get formatName() {
      return helper.formatName(this.gender, this.firstName, this.lastName)
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `First Name is Required`
        }, notEmpty: {
          msg: `First Name is Required`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Last Name is Required`
        }, notEmpty: {
          msg: `Last Name is Required`
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Date of Birth is Required`
        }, notEmpty: {
          msg: `Date of Birth is Required`
        },
        isBefore: {
          args: new Date(new Date().setFullYear(new Date().getFullYear() - 12)).toString(),
          msg: `Age Minimum 12 Years`
        } 
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Gender is Required`
        }, notEmpty: {
          msg: `Gender is Required`
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Phone Number is Required`
        }, notEmpty: {
          msg: `Phone Number is Required`
        }
      }
    },
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};