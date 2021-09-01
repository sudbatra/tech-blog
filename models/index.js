const User = require('./user.js');
const BlogPost = require('./blogPost');
const Comment = require('./comment');

BlogPost.belongsTo(User,{
    foreignKey:'user_id'
});

User.hasMany(BlogPost,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

BlogPost.hasMany(Comment,{
    foreignKey:'blog_id',
    onDelete:'CASCADE'
});

Comment.belongsTo(User,{
    foreignKey:'user_id',
});
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(BlogPost, {
    foreignKey: {
        name: "blog_id",
    },
});

module.exports = {
    User,
    BlogPost,
    Comment
}