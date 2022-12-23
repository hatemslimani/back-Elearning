const { ObjectID } = require('bson');
const courseModel = require('../models/course');
// afficher courses
exports.afficherTout = async(req, res) => {
    try {
        var courses = await courseModel.find().populate('categoryID')
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
exports.afficherTop = async(req, res) => {
    try {
        var courses = await courseModel.find().populate('categoryID').limit(6)
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
exports.getCourseById = async(req, res) => {
    try {
        var courses = await courseModel.find({_id:req.params.idd}).populate('categoryID');
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
exports.getLastCourse = async(req, res) => {
    try {
        var courses = await courseModel.find().sort({created_at:-1}).limit(3).populate('categoryID')
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
exports.getComments = async(req, res) => {
    try {
        var courses = await courseModel.find({ _id: req.params.id },{comments:1}).sort({"comments.created_at":1})
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
exports.searchByname = async(req, res) => {
    try {
        var courses = await courseModel.find({name:{$regex:req.body.name}}).populate('categoryID')
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};

exports.searchByCategory = async(req, res) => {
    try {
        var courses = await courseModel.find({categoryID:req.body.categoryID}).populate('categoryID')
        res.send(courses)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};
// créer un nouveau course
exports.creer = async(req, res) => {
    try {
        var course = new courseModel({
            name: req.body.name,
            description: req.body.description,
            contents: req.body.contents,
            categoryID: req.body.categoryID,
            image: 'http://localhost:3000/'+ req.file.path
        });
        var result = await course.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};

exports.addLesson = async(req, res) => {
    try {
        var course = await courseModel.updateOne({ _id: req.params.id },
            {
                $push:{lessons:{
                        name:req.body.name,
                        videoLink:'http://localhost:3000/'+ req.file.path
                    }}
            }).exec()
        res.status(202).send(course)
    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
};
exports.addComment = async(req, res) => {
    try {
        var course = await courseModel.updateOne({ _id: req.params.id },
            {
                $push:{comments:{
                        comment:req.body.comment,
                        //user:"6384c2a0e98931cdfec8ddc4"
                    }}
            }).exec()
        res.status(202).send(course)
    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
};
exports.deleteComment = async(req, res) => {
    try {
        console.log(req.body.idComment);
        var course = await courseModel.updateOne({ _id: req.params.id },
            {
                $pull:{comments:{
                        _id:req.body.idComment,
                        //user:"6384c2a0e98931cdfec8ddc4"
                    }}
            }).exec()
        res.status(202).send(course)
    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
};