const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    text: DataTypes.STRING,
}, {
    timestamps: true,
    modelName: 'comments'
});

module.exports = { Comment };