const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const User = sequelize.define('User', {
    cpf: {
       type: DataTypes.STRING,
       primaryKey: true,
       allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Imageurl: DataTypes.STRING 
}, {
    timestamps: true,
    modelName: 'users'
});

module.exports = { User };