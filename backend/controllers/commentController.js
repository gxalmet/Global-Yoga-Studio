import Comment from '../models/commentModel.js';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;
import bcrypt from 'bcryptjs';
import data from '../data.js';
import { getToken, generateToken } from '../utils.js';


var commentController = {

    createComment: async function(req, res) {


        const comment = new Comment({
            text: req.body.text,
            parentID: req.body.parentID ? req.body.parentID : ObjectId.Empty,
            userID: req.body.userID,
            teacherIDProfile: req.body.teacherIDProfile
        });



        try {
            const insertedComment = await comment.save();
            return res.status(200).send({ Comment: insertedComment });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }


    },
    readComments: async function(req, res) {

        const teacherID = req.params.id;

        const query = { teacherIDProfile: ObjectId(teacherID) };

        try {
            const commentsList = await Comment.find(query).populate("userID");
            commentsList.sort((a, b) => b.createdAt - a.createdAt);

            return res.status(200).send({ comments: commentsList });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }


    },

}

export default commentController;