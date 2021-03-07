const models = require('../models');

const bcriptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

function signUp(req, res){

    models.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already use !!",
            });                 
        } else {
            bcriptjs.genSalt(10, function(err, salt){
                bcriptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name : req.body.name,
                        email : req.body.email,
                        password : hash
                    }
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User Create succesfully",
                            post: user 
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error 
                        });     
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error 
        }); 
    });
}

function login (req, res) {
    console.log(req.body.email);

    // Check apakah email terdaftar
    models.User.findOne({where:{email:req.body.email}}).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Invalid credential"
            });             
        } else {
            bcriptjs.compare(req.body.password, user.password, function(err, result){
                if (result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authenication Successfull !!",
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credential"
                    });                      
                }                    
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Email tidak ditemukan",
            error: error 
        });
    });
}

module.exports= {
    signUp: signUp,
    login: login
}