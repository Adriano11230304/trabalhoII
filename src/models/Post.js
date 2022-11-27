const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');
const { User } = require('./User');

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


    

    /*getDateFormatter(){
        const dia = this.created_at.getDate() < 10 ? '0' + this.created_at.getDate() : this.created_at.getDate();
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const mes = months[this.created_at.getMonth()];
        const ano = this.created_at.getFullYear();
        const hora = this.created_at.getHours() < 10 ? '0' + this.created_at.getHours() : this.created_at.getHours();
        const minutos = this.created_at.getMinutes() < 10 ? '0' + this.created_at.getMinutes() : this.created_at.getMinutes();
        const segundos = this.created_at.getSeconds() < 10 ? '0' + this.created_at.getSeconds() : this.created_at.getSeconds();
        const date = dia + ' de ' + mes + ' de ' + ano + ' ' + hora + ':' + minutos + ':' + segundos;
        return date;
    }*/