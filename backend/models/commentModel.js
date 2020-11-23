import mongoose from 'mongoose';

var commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    parentID: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: false },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    teacherIDProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;