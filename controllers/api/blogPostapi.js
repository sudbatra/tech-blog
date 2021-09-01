const {
    BlogPost,
    User,
    Comment
  } = require('../../models');
  const withAuth = require('../../utils/withAuth');
  const router = require('express').Router();
  
  
  router.get('/', async (req, res) => {
  
    let blogData = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'User'
      }]
    }, {
      where: {
        user_id: req.session.user_id
      }
    });
  
    return blogData
  
  });
  
  router.post('/', async (req, res) => {
    try {
      const newData = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newData);
    } catch (err) {
      res.status(400).json(err);
    }
  
  })
  router.delete('/:id', async (req, res) => {
    try {
      const delData = await BlogPost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      })
  
      res.status(200).json(delData)
    } catch (err) {
      throw err
    }
  
  })
  
  router.post('/comment', async (req, res) => {
    try {
      const newComment = await Comment.create({
        comment_body: req.body.comment_body,
        user_id: req.session.user_id,
        blog_id: req.body.blog_id,
      })
    } catch (err) {
      console.log(err)
    }
  });
  
  
  
  
  module.exports = router