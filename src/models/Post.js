const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Post = sequelize.define('Post', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    } ,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageURL: DataTypes.STRING
}, {
    timestamps: true,
    modelName: 'posts'
});

module.exports = { Post };