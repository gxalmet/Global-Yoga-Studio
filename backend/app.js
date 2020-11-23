import express from 'express';
import bodyparser from 'body-parser';
import userRoutes from './routes/userRouter.js';
import teacherRoutes from './routes/teacherRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import commentRouter from './routes/commentRouter.js';
import cors from 'cors';
import User from './models/userModel.js';
import Teacher from './models/teacherModel.js';
import path from 'path';

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());


app.use('/api/user/schema', async(req, res) => {
    res.send(new User);
});
app.use('/api/teacher/schema', async(req, res) => {
    res.send(new Teacher);
});

app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/files', uploadRouter);
app.use('/api/comments', commentRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

//Export

export default app;