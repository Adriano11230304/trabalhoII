const Post = require('../models/post');
const Image = require('../models/image');
const { search } = require('../routes/postsRoutes');

class PostController{

    async list(req, res) {
        let offset = 0;
        let posts;
        if (req.params.page == undefined){
            posts = await Post.listAll(0);
        }else{
            offset = req.params.page*5 - 5;
            posts = await Post.listAll(offset);
        }
        
        const images = await Image.listAll();
        const date = [];
        for(let i = 0; i < posts.length; i++){
            date.push(posts[i].getDateFormatter());
        }
        let d = 0;
        const totalPosts = await Post.list();
        res.render('index', { posts, totalPosts, date, images, d });
    }

    addPost(req, res){
        res.render('add-post');
    }

    async add(req, res){
        const date = new Date();
        const offset = date.getTimezoneOffset();
        const created_at = date - offset;  
        const post = new Post(req.body.title, req.body.description, req.body.author, created_at);
        let posts = await Post.listAll(0);
        post.save(async () =>{
            let msg = 'Post cadastrado com sucesso!';
            posts = await Post.listAll(0);
            
            const date = [];
            for (let i = 0; i < posts.length; i++) {
                date.push(posts[i].getDateFormatter());
            }
            let d = 0;
            const image = new Image(req.body.url, posts[0]);
            console.log(image);
            image.add(async () => {})
            const images = await Image.listAll();
            const totalPosts = await Post.list();
            res.render('index', { posts, totalPosts, date, msg, images, d });
        })  
    }

    remove(req, res){
        const id = req.params.id;
        Image.deleteAllPostId(id, ()=>{

        });
        Post.delete(id, async () => {
            let msg = 'Post removido com sucesso!';
            const posts = await Post.listAll(0);
            const date = [];
            for (let i = 0; i < posts.length; i++) {
                date.push(posts[i].getDateFormatter());
            }
            const images = await Image.listAll();

            let d = 0;
            const totalPosts = await Post.list();
            res.render('index', { posts, totalPosts, date, msg, images, d });
        });

    }

    async updateForm(req, res){
        const id = req.params.id;
        const post = await Post.getById(id);
        
        res.render('updateForm', {post});
    }

    update(req,res){
        let id, title, description, author, created_at;
        id = req.body.id;
        title = req.body.title;
        description = req.body.description;
        author = req.body.author;
        created_at = req.body.created_at;
        const post = new Post(title, description, author, created_at, id);
        post.update(async () => {
            let msg = 'Post alterado com sucesso!';
            const posts = await Post.listAll(0);
            const date = [];
            for (let i = 0; i < posts.length; i++) {      
                date.push(posts[i].getDateFormatter());
            }
            const images = await Image.listAll();
            let d = 0;
            const totalPosts = await Post.list();
            res.render('index', { totalPosts, posts, date, msg, images, d });
        });


    }

    async postDetails(req, res){
        const id = req.params.id;
        const post = await Post.getById(id);
        const images = await Image.listAllId(post);
        const date = post.getDateFormatter();

        res.render('postDetails', { post, images, date });
    }
    
    async search(req, res) {
        const search = req.body.search;
        const posts = await Post.search(search);
        const images = await Image.listAll();
        const date = [];
        for (let i = 0; i < posts.length; i++) {
            date.push(posts[i].getDateFormatter());
        }
        let d = 0;
        const totalPosts = posts;

        res.render('index', { posts, images, date, d, totalPosts});
    }
    
};



module.exports = PostController;