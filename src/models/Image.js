const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    url: DataTypes.STRING,
}, {
    timestamps: true,
    modelName: 'images'
});

module.exports = { Image };