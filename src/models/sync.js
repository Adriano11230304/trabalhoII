const { Post } = require('./Post');
const { User } = require('./User');

User.hasMany(Post);
Post.belongsTo(User);


const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

sequelize.sync();