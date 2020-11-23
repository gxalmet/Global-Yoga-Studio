import uploadMongoo from "../middleware/upload.js";
import multer from "multer";
import path from 'path';
import MongoClient from 'mongodb';
import dotenv from 'dotenv';

const conf = dotenv.config();

//const MongoURI = conf.parsed.MONGODB_URL;
const MongoURI = process.env.MONGODB_URL;
// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function(req, file, cb) {
//         cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
// });


// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
// }).single("myFile");

const uploadFile = {
    create: async(req, res) => {

        try {
            await uploadMongoo(req, res);

            console.log("Request file ---", req.files);
            console.log("Request file ---", req.file);
            console.log("Response body ---", res.storage);


            if (req.file == undefined) {
                return res.send(`You must select a file.`);
            }
            const result = {
                id: req.file.id,
                filename: req.file.filename
            };
            return res.status(200).send({ file: result });
        } catch (error) {
            console.log(error);
            return res.send(`Error when trying upload image: ${error}`);
        }
    },
    getFile: async(req, res) => {
        let fileID = req.params.id;

        var ObjectID = MongoClient.ObjectID;
        MongoClient.connect(MongoURI, { useUnifiedTopology: true }, function(err, client) {

            if (err) {
                return res.render('index', { title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg });
            }
            const dbName = "GlobalYogaStudio";
            const db = client.db(dbName);
            const collection = db.collection('teacherFile.files');
            const collectionChunks = db.collection('teacherFile.chunks');

            collection.find(ObjectID(fileID)).toArray(function(err, docs) {
                if (err) {
                    return res.render('index', { title: 'File error', message: 'Error finding file', error: err.errMsg });
                }
                if (!docs || docs.length === 0) {
                    return res.render('index', { title: 'Download Error', message: 'No file found' });
                } else {
                    //Retrieving the chunks from the db
                    collectionChunks.find({ files_id: docs[0]._id }).sort({ n: 1 }).toArray(function(err, chunks) {
                        if (err) {
                            return res.render('index', { title: 'Download Error', message: 'Error retrieving chunks', error: err.errmsg });
                        }
                        if (!chunks || chunks.length === 0) {
                            //    No data found
                            return res.render('index', { title: 'Download Error', message: 'No data found' });
                        }
                        //Append Chunks
                        let fileData = [];
                        for (let i = 0; i < chunks.length; i++) {
                            // This is in Binary JSON or BSON format, which is stored
                            // in fileData array in base64 endocoded string format
                            fileData.push(chunks[i].data.toString('base64'));
                        }
                        // Display the chunks using the data URI format
                        let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
                        res.status(200).send({ imageView: 'imageView', file: { title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile } });
                    });
                }
            });

        });

    }
};

// const uploadController = {
//     uploadFile: uploadFile
// };

export default uploadFile;