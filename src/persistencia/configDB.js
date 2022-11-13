const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/persistencia/bancoPosts.db'
});

sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(error => {
        console.log('Unable to connect to the database:', error);
    });

module.exports = sequelize;