const multer = require('multer');
const express = require('express');
const router = express.Router();
const fileService = require('./file.service');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage })

function uploadFile(req, res, next) {
    fileService.uploadNewPhoto(req.file)
        .then(uploadResult => uploadResult ? res.json(uploadResult) : res.sendStatus(404))
        .catch(err => next(err));
}

function findFileById(req, res, next) {
    fileService.findPhotoById(req.params.id)
        .then(result => {
            res.contentType('image/jpg')
            res.send(result.image)
        })
        .catch(err => next(err));
}

// Files routes
router.post('/uploadfile', upload.single('picture'), uploadFile);
router.get('/:id', findFileById);

module.exports = router;
