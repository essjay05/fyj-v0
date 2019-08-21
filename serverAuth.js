// Require User model
const User = require('./models/User');

const authenticate = async (req, res, next) => {
    let token = req.header('x-auth');

    try {
        const foundUser = await User.verifyToken(token);

        if (!foundUser) {
            throw new Error();
        }

        req.user = foundUser;
        req.token = token;
        next();

    } catch (err) {
        res.status(401).send({ error: 'Authentication failed. Did you log in?'});
        console.log(err);
    }
}

module.exports = authenticate;