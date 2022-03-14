const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY,
    secure: true,
});

const hostFile = async (req, res, next) => {
    try {
        const files = [];
        if (req.files.length >= 1) {
            for (const key of req.files) {
                console.log('in');
                cloudinary.uploader.upload(
                    key.path,
                    { unique_filename: true },
                    async (error, result) => {
                        try {
                            if (error) {
                                next(error);
                            } else {
                                const data = {
                                    fieldName: key.fieldname,
                                    imageInfo: {
                                        publicId: result.public_id,
                                        secureUrl: result.secure_url,
                                    },
                                };
                                files.push(data);
                                await fs.unlink(key.path);
                            }
                        } catch (err) {
                            next(err);
                        }
                    }
                );
            }
        }
        console.log('out');
        req.files = files;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = hostFile;
