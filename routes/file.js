var express = require('express');
var router = express.Router();

const FileService = require('../services/file.service');

const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), FileService.upload);
router.get('/download/:fileId', FileService.download);

module.exports = router;