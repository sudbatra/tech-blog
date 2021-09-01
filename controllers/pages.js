const router = require('express').Router();
const User = require('../models/user');
const BlogPost = require('../models/blogPost');
const Comment = require('../models/comment')
const withAuth = require('../utils/withAuth')


router.get('/login',(req,res)=>{
try{
  res.render('login')
} catch(err){
    console.log(err);
    res.status(500).json(err);
}
});
router.get('/sign-up',(req,res)=>{
    try{
   if (req.session.logged_in) {
            res.redirect("/");
            return;
        }
    res.render('sign-up');
    } catch(err){
        console.log(err)
    }
})
router.get('/post',withAuth,(req,res)=>{
    try{
        res.render('blogPost', {
            logged_in: req.session.logged_in
          })

    } catch(err){
        console.log(err)
    }
})
router.get('/',withAuth,async (req,res)=>{
    let blogData= await BlogPost.findAll({include:[{model:User}]});
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homePage',{
        blogs,
        logged_in:req.session.logged_in
    })
    
    });
    router.get('/dashboard',async(req,res)=>{


const userData = await User.findOne({where:{
    id:req.session.user_id
    }});

    const userInfo = userData.get({plain:true})
console.log(userInfo)
        const blogdata = await BlogPost.findAll({where:{
            user_id:req.session.user_id
            }})

            const blogs = blogdata.map((blog) => blog.get({ plain: true }));
            res.render('dashboard',{
                blogs,
                userInfo,
                logged_in:req.session.logged_in
            })
    })
    router.get('/comment/:id', async (req, res) => {
        try {
          const getComments = await Comment.findAll({include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],  where: {
            blog_id: req.params.id
          }});
      
          const comments = getComments.map((comment) => comment.get({
            plain: true
          }))
          console.log(comments)
          res.render('comments',{
            comments,
            logged_in:req.session.logged_in
          });
        } catch (err) {
          console.log(err)
        }
      })
module.exports = router;