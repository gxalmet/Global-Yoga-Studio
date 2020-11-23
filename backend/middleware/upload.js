import util from "util";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import dotenv from 'dotenv';

const conf = dotenv.config();

const MongoURI = conf.parsed.MONGODB_URL || process.env.MONGODB_URL;

var storage = new GridFsStorage({
    url: MongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "teacherFile",
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

var uploadFile = multer({ storage: storage }).single("myFile");

var uploadFilesMiddleware = util.promisify(uploadFile);

export default uploadFilesMiddleware;