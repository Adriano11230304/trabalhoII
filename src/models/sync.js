const { Post } = require('./Post');
const { User } = require('./User');
const { Comment } = require('./Comment');
const { Like } = require('./Like');

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Like);
Like.belongsTo(Post);

Comment.hasMany(Like);
Like.belongsTo(Comment);


const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

sequelize.sync();