'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.hasMany(models.Like)
      Post.belongsToMany(models.User, { through: `UserLike` })
    }

    static deletePostMethod(req) {
      return this.destroy({
        where: {
          id: req.params.id
        }
      })
    }
  }
  Post.init({
    caption: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};