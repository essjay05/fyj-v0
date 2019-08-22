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
    
    },
    // Patch User
    update: ( req, res ) => {
        console.log(`User to be updated: ${req.params.id}`)
    
        User.findById(req.params.id, ( err, updatedUser) => {
            if (!req.body.password) delete req.body.password
            Object.assign( updatedUser, req.body )
            updatedUser.save(( err, updatedUser ) => {
                if (err) res.json({ message: "ERROR", payload: null, code: err.code })
                res.json({ message: "Successfully updated the user!", payload: updatedUser})
            })
        })
    },
    // Delete User
    destroy: async ( req, res ) => {
        console.log(`Finding user id# ${req.params.id} to delete`);
        try {
            const foundUser = await User.findOneAndDelete({ _id: req.params.id });
            const deletedUser = await foundUser.save();
            res.status(200).send(`Successfully deleted: ${deletedUser}`);
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }   
    }
}