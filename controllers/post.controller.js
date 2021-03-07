const models = require('../models');

// --- CREATE DATA
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


// --- SHOW SINGLE DATA
function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error 
        });
    });

}

// -- GET ALL DATA
function index(req, res){
    models.Post.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error 
        });        
    });
}

// -- UPDATE DATA
function update(req, res){
    const id = req.params.id;

    const updatedData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,       
    }

    const userId = 1;
    models.Post.update(updatedData, {where: {id:id}}).then(result => {
        res.status(201).json({
            message: "Post update succesfully",
            post: updatedData 
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error 
        });            
    });
}

// DELETE DATA
function destroy(req, res){
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({where:{id:id}}).then(result => {
        res.status(201).json({
            message: "Post update succesfully",
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
    save : save,
    show : show,
    index : index,
    update : update,
    destroy : destroy
}