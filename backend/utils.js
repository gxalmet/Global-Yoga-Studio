import jwt from 'jsonwebtoken';

function generateToken(user) {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            teacher: user.teacher
        },
        process.env.JWT_SECRET, {
            expiresIn: '30d'
        }
    );
}

function getToken(user) {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            name: user.surname,
            email: user.email,
            teacher: user.teacher,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET, {
            expiresIn: '48h',
        }
    );
}

function isAuth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ message: 'Token is not supplied.' });
    }
}

function isAdmin(req, res, next) {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
}


export { generateToken, getToken, isAuth, isAdmin };