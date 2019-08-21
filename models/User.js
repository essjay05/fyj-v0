// REQUIRE CONSTANTS
const
    mongoose = require('mongoose'),
    // Need to add encryption/authentication
        bcrypt = require('bcryptjs'),
        jwt = require('jsonwebtoken');


// Create Project Schema {to be nested in User Schema};
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    techUsed: { type: String },
    deployedLink: { type: String },
    githubLink: { type: String },
    image: [{ type: String }]
})

// Create User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 1 },
    lastName: { type: String, required: true, minlength: 1 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    tokens: [{ 
        access: {type: String, required: true},
        token: {type: String, required: true}
    }],
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

// Custom methods/statics:
// SignToken
userSchema.methods.signToken = async function() {
    let user = this;
    console.log(`signToken user is: ${user}`);
    let access = 'auth';

    // Create token
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET, { expiresIn: '1 min' }).toString();
    // Adding access and token variables to our user.tokens array
    user.tokens = user.tokens.concat([{ access, token }]);

    // Await result of user.save function
    const savedToken = await user.save();
    console.log(`savedToken after creation is: ${savedToken}`)
    return token;
};

// Verify Token:
userSchema.statics.verifyToken = async function(token) {
    let User = this;
    var decoded;

    try {
        decoded = jwt.verify( token, process.env.JWT_SECRET );
    } catch (err) {
        console.log(err);
        Promise.reject(err);
    }

    try {
        const foundUser = await User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });

        console.log(`VerifyToken foundUser: ${foundUser}`);
        return foundUser;
    } catch (err) {
        console.log(err)
        return Promise.reject(err);
    }
};

// Static method to find user by email/password:
userSchema.statics.findByCredentials = async function( userInput, password) {
    let User = this;

    try {
        const foundEmail = await User.findOne({ email: userInput });
        // if NO EMAIL FOUND: 
        if (!foundEmail) {
            const foundUsername = await User.findOne({ username: userInput });
            if (!foundUsername) {
                return Promise.reject();
            }
            // If Username IS found:
            const matchedPassword = await foundUsername.comparePassword(password);
            console.log(`matchedPassword: ${matchedPassword}`);
            console.log(`foundUsername: ${foundUsername}`);
            return Promise.resolve(foundUsername)
            
        }
            // If User email IS found: 
            const matchedPw = await foundEmail.comparePassword( password );
            console.log(`FindByCredentials matchedPw is : ${ matchedPw }`);
            console.log(`FindByCredentials foundEmail is: ${ foundEmail }`)
            return Promise.resolve(foundUser);
    } catch (err) {
        console.log(`ERROR: Invalid credentials`)
        return Promise.reject();
    }
}

// CHECK VALID PASSWORD
    // Insert bcrypt check valid password code here
userSchema.methods.comparePassword = async function( password ) {
    const match = await bcrypt.compare( password, this.password );
    if ( !match ) {
        console.log(`Password is invalid.`)
        return Promise.reject();
    } console.log(`comparePassword match is: ${match}`)
    console.log(`Success! Password is a match!`);
    return Promise.resolve( match );
} 

// Pre-Save/GENERATE/BCRYPT PASSWORD
    // Insert bcrypt code here
userSchema.pre('save', function(next) {
    let user = this;

    if  (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});



// Export constants and models:
const 
    User = mongoose.model('User', userSchema),
    Project = mongoose.model('Project', projectSchema);

module.exports = User, Project;