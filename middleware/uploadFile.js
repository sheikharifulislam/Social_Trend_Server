const multer = require('multer');

const uploadFolder = 'uploads/';

const storage = multer.diskStorage({
    destinatio: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    fileName: (req, file, cb) => {
        cb(null, file.originalName);
    },
});

const uploadFile = multer({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: (req, file, cb) => {
        const allowedFileExt = /jpeg|png|jpeg|mp4/;
        const mimeType = allowedFileExt.test(file.mimetype);
        if (mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
        }
    },
});

module.exports = uploadFile;
