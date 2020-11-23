import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

import { getToken, generateToken } from '../utils.js';


var userController = {

    signIn: async function(req, res) {

        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(200).send({
                        _id: user._id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        teacher: user.teacher,
                        token: generateToken(user)
                    });
                } else {
                    return res.status(404).send({ error: 'Password incorrect' });
                }
            } else {
                return res.status(404).send({ error: 'User not created' });
            }

        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },
    insertManyUser: async function(req, res) {

        try {
            const insertedUsers = await User.insertMany(data.users);
            return res.status(200).send({ Users: insertedUsers });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }

    },
    createUser: async function(req, res) {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            teacher: req.body.teacher,
            password: bcrypt.hashSync(req.body.password)
        });
        try {
            const createdUser = await user.save();
            return res.status(200).send({
                _id: createdUser._id,
                name: createdUser.name,
                surname: createdUser.surname,
                email: createdUser.email,
                teacher: createdUser.teacher,
                token: generateToken(createdUser)
            });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }



    },
    readUser: async function(req, res) {
        try {
            const userRead = User.findById({ _id: req.body.id });
            return res.status(200).send({
                _id: userRead._id,
                name: userRead.name,
                surname: userRead.surname,
                email: userRead.email,
                teacher: userRead.teacher,
                token: generateToken(createdUser)
            });
        } catch (error) {
            return res.status(404).send({ message: "User not found." });
        }
    },
    updateUser: async function(req, res) {
        const userID = req.params.id;
        const user = await User.findById(userID);
        if (user) {
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            user.teacher = req.body.teacher || user.teacher;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            const updatedUser = await user.save();
            return res.status(200).send({
                _id: updatedUser.id,
                name: updatedUser.name,
                surname: updatedUser.surname,
                email: updatedUser.email,
                teacher: updatedUser.teacher,
                isAdmin: updatedUser.isAdmin,
                token: getToken(updatedUser),
            });
        } else {
            return res.status(404).send({ message: "User not found." });
        }
    },
    deleteuser: async function(req, res) {
        return res;
    },
}

export default userController;