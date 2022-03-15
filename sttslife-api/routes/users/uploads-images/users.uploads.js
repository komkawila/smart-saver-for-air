const express = require('express');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

const route = express.Router();

route.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));
route.use(morgan('dev'));

route.post('/:user_id', async (req, res) => {
    try {
        if (!req.files && !req.params.user_id) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let file = req.files.file;
            const user_id = req.params.user_id;
            const mimetype = file.mimetype.toLowerCase();

            const typefile = mimetype.substring(0, mimetype.indexOf("/"));
            const typename = mimetype.substring(mimetype.indexOf("/") + 1, mimetype.length);
            if (typefile != "image")
                res.status(500).send({
                    status: false,
                    message: 'File is not images',
                });
            console.log(typename);
            // file.mv('./uploads/' + user_id + "." + typename);
            //             // ##
            if (typename == "heic") {
                (async () => {
                    await file.mv('./routes/users/uploads-images/uploads/temps.heic');
                    const inputBuffer = await promisify(fs.readFile)('./routes/users/uploads-images/uploads/temps.heic');
                    const outputBuffer = await convert({
                        buffer: inputBuffer, // the HEIC file buffer
                        format: 'PNG'        // output format
                    });

                    await promisify(fs.writeFile)('./routes/users/uploads-images/uploads/' + user_id + '.png', outputBuffer);
                    // await promisify(fs.writeFile)('./uploads/' + user_id + '.png', outputBuffer);
                })();
                
                console.log("HEIC Type");
            } else {
                file.mv('./routes/users/uploads-images/uploads/' + user_id + ".png");
            }
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: user_id + ".png",
                    // name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = route;