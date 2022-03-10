const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY,
    secure: true,
});

const hostFile = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path, { unique_filename: true }, async (error, result) => {
        try {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                await fs.unlink(req.file.path);
                next();
            }
        } catch (err) {
            next(err);
        }
    });
};

module.exports = hostFile;
