const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const User = sequelize.define('User', {
    cpf: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    nome: DataTypes.STRING,
    created_at: DataTypes.INTEGER
}, {
    timestamps: false,
    modelName: 'users'
});

module.exports = { User };