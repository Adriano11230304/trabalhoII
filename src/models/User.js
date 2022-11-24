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
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    timestamps: true,
    modelName: 'users'
});

// User.sync({ force: true });

module.exports = { User };