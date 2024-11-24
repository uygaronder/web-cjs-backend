const express = require('express');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');
const fs = require('fs'); // To delete temporary files

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/singleImage', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path
            , { folder: 'uploads/' }
        );
        // Remove file from server
        fs.unlinkSync(req.file.path);
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;