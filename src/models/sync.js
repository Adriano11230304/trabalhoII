const { Post } = require('./Post');
const { User } = require('./User');
const { Comment } = require('./Comment');

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);


const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

sequelize.sync();