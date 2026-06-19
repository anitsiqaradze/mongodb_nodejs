const FileModel = require('../models/file');
const mongoose = require('mongoose');
const fs = require('fs');

module.exports = {
    upload: async (req, res) => {
        try {
            const rootPath = "C:\\uploads";

            const id = new mongoose.Types.ObjectId();

            const fileNameParts = req.file.originalname.split('.');
            const extension = fileNameParts[fileNameParts.length - 1];

            const finalPath = `${rootPath}\\${id}.${extension}`;

            fs.writeFileSync(finalPath, fs.readFileSync(req.file.path));

            fs.unlinkSync(req.file.path);

            const file = await new FileModel({
                _id: id,
                fileName: req.file.originalname,
                size: req.file.size,
                path: finalPath,
                mimetype: req.file.mimetype
            }).save();

            res.json(file);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    download: async (req, res) => {
        try {
            const file = await FileModel.findById(req.params.fileId);

            if (!file) {
                return res.status(404).json({
                    message: 'file not found'
                });
            }

            res.set({
                'Content-Type': file.mimetype,
                'Content-Disposition': 'attachment; filename=' + encodeURIComponent(file.fileName)
            });
            fs.createReadStream(file.path).pipe(res);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}