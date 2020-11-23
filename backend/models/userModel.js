import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teacher: { type: String, default: false, required: true },
    isAdmin: { type: String, default: false, required: true }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;