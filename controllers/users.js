// Require model
const User = require('../models/User');

// Make controls exportable
module.exports = {
    // Create User: WORKS
    create: async ( req, res ) => {
        console.log(req.body);
    
        let user = new User ({ 
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        });
    
        try {
            const savedUser = await user.save();
            res.status(200).send(savedUser);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
    // Index User
    index: async ( req, res ) => {
        console.log(`Finding ALL users in database.`);
        try {
            const users = await User.find({});
            res.status(200).send(users);
            console.log(`Here's the total list of ${users.length} many users: ${users}`);
        } catch(err) {
            res.status(400).send({ errorMsg: error });
            console.log(error);
        }
    },
    // Show User
    show: async ( req, res ) => {
        console.log(`Finding userID: ${req.params.id}`)
    
        try {
            const foundUser = await User.find({ _id: req.params.id });
            res.status(200).send(foundUser);
            console.log(`Found user: ${foundUser}`)
        } catch(err) {
            res.status(400).send({ errorMsg: error });
        }
    
    }
    // Patch User

    // Delete User
}