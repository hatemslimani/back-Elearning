const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(uniqueSuffix);
        cb(null, uniqueSuffix +'.'+ file.mimetype.split('/')[1])
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg') {
        cb(null, true)

    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 500
    },
    fileFilter: fileFilter
});
module.exports = upload