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
    role: DataTypes.STRING,
    createdAt: DataTypes.INTEGER,
    updatedAt: DataTypes.INTEGER
}, {
    timestamps: true,
    modelName: 'users'
});

module.exports = { User };