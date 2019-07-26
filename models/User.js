// REQUIRE CONSTANTS
const
    mongoose = require('mongoose');
    // Need to add encryption/authentication
        // bcrypt = require('bcrypt');

// Create Project Schema {to be nested in User Schema};
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    techUsed: { type: String },
    deployedLink: { type: String },
    githubLink: { type: String },
    image: { type: String }
})

// Create User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 1 },
    lastName: { type: String, required: true, minlength: 1 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    bannerImg: { type: String },
    profileImg: { type: String },
    title: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    skills: { type: String },
    aboutUser: { type: String },
    linkedIn: { type: String },
    github: { type: String },
    website: { type: String },
    projects: [projectSchema]
}, { timestamps: true })

// GENERATE/BCRYPT PASSWORD
    // Insert bcrypt code here

// CHECK VALID PASSWORD
    // Insert bcrypt check valid password code here

// For User Edit check and save new
    // Insert code here

// Export constants and models:
const 
    User = mongoose.model('User', userSchema),
    Project = mongoose.model('Project', projectSchema);

module.exports = User, Project;