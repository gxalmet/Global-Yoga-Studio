import mongoose from 'mongoose';
var schema = mongoose.Schema;

var teacherSchema = schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    img: { type: String, required: true },
    place: { type: String, required: true },
    languages: [{ type: String, required: true }],
    remote: { type: Boolean, default: false, required: true },
    type: [{ type: String, required: true }],
    urlYoutube: String,
    urlInstagram: String,
    des: { type: String, required: true },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;