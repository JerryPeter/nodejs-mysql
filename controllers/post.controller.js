const models = require('../models');

function save(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }

     models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post create succesfully",
            post: result 
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error 
        });
    });
}

module.exports = {
    save : save
}