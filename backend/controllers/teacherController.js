import Teacher from '../models/teacherModel.js';
import data from '../data.js';

var teacherController = {
    insertManyTeacher: async function(req, res) {

        try {
            const insertedTeacher = await Teacher.insertMany(data.teachers);
            return res.status(200).send({ Teacher: insertedTeacher });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },
    createTeacher: async function(req, res) {

        const teacher = new Teacher({
            userID: req.params.id,
            name: ' ',
            country: ' ',
            img: ' ',
            place: ' ',
            languages: [' '],
            remote: false,
            type: [' '],
            urlYoutube: ' ',
            urlInstagram: ' ',
            des: ' '
        });
        try {
            const teacherSaved = await teacher.save();
            return res.status(200).send({ teacher: teacherSaved });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }


    },
    readTeacher: async function(req, res) {

        try {
            const teachersList = await Teacher.findById(req.params.id);
            return res.status(200).send({ teacher: teachersList });
        } catch (error) {

            return res.status(500).send({ error: error.message });
        }
    },
    readTeacherByUser: async function(req, res) {

        try {
            const teachersList = await Teacher.findOne({ userID: req.params.id });
            return res.status(200).send({ teacher: teachersList });
        } catch (error) {

            return res.status(500).send({ error: error.message });
        }
    },
    readAllTeacher: async function(req, res) {

        try {
            const teachersList = await Teacher.find({});
            return res.status(200).send({ teachers: teachersList });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },
    updateTeacher: async function(req, res) {

        try {
            const teacherRead = await Teacher.findById(req.params.id);
            teacherRead.name = req.body.name || teacherRead.name;
            teacherRead.country = req.body.country || teacherRead.country;
            teacherRead.img = req.body.img || teacherRead.img;
            teacherRead.place = req.body.place || teacherRead.place;
            teacherRead.languages = req.body.languages || teacherRead.languages;
            teacherRead.remote = req.body.remote || teacherRead.remote;
            teacherRead.type = req.body.type || teacherRead.type;
            teacherRead.urlYoutube = req.body.urlYoutube || teacherRead.urlYoutube;
            teacherRead.urlInstagram = req.body.urlInstagram || teacherRead.urlInstagram;
            teacherRead.des = req.body.des || teacherRead.des;
            try {
                const teacherUpdated = await teacherRead.save();
                return res.status(200).send({ teacher: teacherUpdated });
            } catch (error) {
                return res.status(500).send({ error: error.message });
            }

        } catch (error) {
            return res.status(500).send({ error: 'Teacher not exists.' });
        }

    },
    deleteteacher: function(req, res) {
        console.log(req);
    }
};

export default teacherController;