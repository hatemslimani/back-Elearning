const express = require('express');
const upload = require('../middleware/uploadImage.middleware');
const uploadVideo = require('../middleware/uploadVideo.middleware');
const router = express.Router()
const categoryController = require('../controllers/category.controllers');
const courseController = require('../controllers/course.controllers');
const checkAuthMiddleware = require('../middleware/checkAuth.middleware');

module.exports = (app) => {
    //get all category
    app.get('/category', categoryController.afficherTout);
    app.get('/courses', courseController.afficherTout);
    app.get('/courses/top', courseController.afficherTop);
    app.get('/courses/last', courseController.getLastCourse);
    app.post('/courses',upload.single('image'), courseController.creer);
    app.post('/courses/searchName', courseController.searchByname);
    app.post('/courses/searchByCategory', courseController.searchByCategory);
    app.get('/courses/:idd', courseController.getCourseById);
    app.post('/courses/addLesson/:id',uploadVideo.single('video'), courseController.addLesson);
    app.post('/courses/addComment/:id', courseController.addComment);
    app.get('/courses/comments/:id', courseController.getComments);
    app.post('/courses/comments/delete/:id', courseController.deleteComment);
}