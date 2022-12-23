const categoryModel = require('../models/category');
// afficher categorys
exports.afficherTout = async(req, res) => {
    try {
        var categorys = await categoryModel.find().sort({name:1})
        res.send(categorys)
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
};

