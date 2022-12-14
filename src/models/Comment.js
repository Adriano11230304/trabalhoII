const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    text: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
}, {
    timestamps: true,
    modelName: 'comments'
});

module.exports = { Comment };