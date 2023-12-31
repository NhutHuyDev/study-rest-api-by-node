'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Book.belongsTo(models.Category, { foreignKey: 'categoryCode', targetKey: 'code', as: 'category' })
        }
    }
    Book.init({
        title: DataTypes.STRING,
        categoryCode: DataTypes.STRING,
        price: DataTypes.FLOAT,
        available: DataTypes.INTEGER,
        image: DataTypes.STRING,
        imageFileName: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Book',
    });
    return Book;
};