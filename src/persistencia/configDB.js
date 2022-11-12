const { verbose, Database } = require('sqlite3');

verbose();

const db = new Database('./src/persistencia/bancoPosts.db', (err) => {
    if(err){
        return console.log(err.message);
    }else{
        console.log('Conectado ao Banco de Dados.');
    }
});

module.exports = db;