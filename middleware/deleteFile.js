const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY,
    secure: true,
});

const deleteFile = (req, res, next) => {
    const { previousFileId } = req.query;
    if (previousFileId) {
        cloudinary.uploader.destroy(previousFileId, async (error, result) => {
            try {
                if (error) {
                    next(error);
                } else {
                    next();
                }
            } catch (err) {
                next(err);
            }
        });
    } else {
        next();
    }
};

module.exports = deleteFile;
