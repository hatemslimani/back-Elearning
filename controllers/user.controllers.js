const userModel = require('../models/user');
const bcrybt = require('bcrypt')
const jwt = require('jsonwebtoken')
var url = require('url');
// créer un nouveau users
exports.creer = async(req, res) => {
    try {
        console.log(req.file);
        var user = new userModel({
            name: req.body.name,
            lastName: req.body.lastName,
            image: req.file.path
        });
        var result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
// afficher la liste des users.
exports.afficherTout = async(req, res) => {
    try {
        var users = await userModel.find() //.select("fullName")
        res.send(users)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
// chercher un user
exports.afficherUn = async(req, res) => {
    try {
        var result = await userModel.findById({ _id: req.params.userId }).exec()
        if (result == null)
            res.status(404).send({ "message": "not found" })
        else res.status(200).send(result)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
// modifier un user
exports.modifier = async(req, res) => {
    try {
        var u = await userModel.findById({ _id: req.params.userId }).exec()
        u.name = req.body.name
        u.lastName = req.body.lastName
        result = await u.save()
        res.status(202).send(result)
    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
};
// Supprimer un user
exports.supprimer = async(req, res) => {
    try {
        var result = await userModel.deleteOne({ _id: req.params.userId }).exec()
        res.status(202).send(result)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
//delete All user
exports.deleteAll = async(req, res) => {
    try {
        var result = await userModel.deleteMany({ name: "aaaa" }).exec()
        res.status(202).send(result)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
exports.signUp = (req, res) => {
    console.log(req.body.role);
    userModel.find({ email: req.body.email }).exec()
        .then(result => {
            if (result.length >= 1) {
                return res.status(409).json({ message: "mail exists " })
            } else {
                bcrybt.hash(req.body.password, 10, function(error, hash) {
                    if (error) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const u = new userModel({
                            email: req.body.email,
                            password: hash,
                            fullName: req.body.fullName,
                            role: req.body.role,
                            //image: req.file.path
                        })
                        u.save().then(r => {
                            console.log(r);
                            res.status(201).json({ message: "User created" });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        })
                    }
                })
            }
        })
}
exports.login = (req, res) => {
    userModel.find({ email: req.body.email }).exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(401).json({ message: "Auth failed" })
            } else {
                bcrybt.compare(req.body.password, result[0].password, (error, resultat) => {
                    if (error) {
                        return res.status(401).json({ message: "Auth failed" })
                    }
                    if (!resultat) {
                        return res.status(401).json({ message: "Auth failed" })
                    } else {
                        const token = jwt.sign({
                            email: result[0].email,
                            userId: result[0]._id
                        }, process.env.JWT_SECRET, {
                            expiresIn: "24h"
                        });
                        console.log(result[0].role);
                        return res.status(201).json({
                            message: "Auth successful",
                            token: token,
                            role:result[0].role
                        });
                    }

                });
            }
        })
}