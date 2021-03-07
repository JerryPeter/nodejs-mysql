const models = require('../models');

const Validator = require('fastest-validator');



// --- CREATE DATA
function save(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }

    const schema = {
        title: {type:"string", optional:false, max: '100'},
        content: {type:"string", optional:false, max: '500'},
        categoryId: {type:"number", optional:false}
    }

    const v = new Validator();
    const validateionResponse = v.validate(post, schema);

    if (validateionResponse !== true) {
        return res.status(400).json({
            message: "Validator Failed",
            errors : validateionResponse
        });
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
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Data not found !!",
            });            
        }
        
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

    const schema = {
        title: {type:"string", optional:false, max: '100'},
        content: {type:"string", optional:false, max: '500'},
        categoryId: {type:"number", optional:false}
    }

    const v = new Validator();
    const validateionResponse = v.validate(updatedData, schema);

    if (validateionResponse !== true) {
        return res.status(400).json({
            message: "Validator Failed",
            errors : validateionResponse
        });
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