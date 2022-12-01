const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    like: DataTypes.BOOLEAN,
}, {
    timestamps: true,
    modelName: 'likes'
});

module.exports = { Like };