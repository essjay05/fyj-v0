// Require model
const User = require('../models/User');

// Make controls exportable
module.exports = {
    // Create User: WORKS
    create: ( req, res ) => {
        User.create(req.body, ( err, newUser ) => {
            if (err) res.json({ success: false, payload: null, code: err.code });
            // If user successfully created... give them a token:
                // const token = signToken(newUser);
            res.json({ success: true, newUser })
        })
    }
    // Index User

    // Show User

    // Patch User

    // Delete User
}