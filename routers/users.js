// Require constants
const
    express = require('express'),
    usersRouter = new express.Router(),
    usersCtrl = require('../controllers/users.js'),
    projectsCtrl = require('../controllers/projects.js');
    authenticate = require('../serverAuth');

// USERS CRUD ROUTES
    // Non-protected Routes
    // Create
        usersRouter.post('/', usersCtrl.create);
    // Index
        usersRouter.get('/', usersCtrl.index);
    // // Authenticate
    //     // usersRouter.post('/authenticate', usersCtrl.authenticate);
    // // Verify Token
    //     // usersRouter.use(verifyToken);
    // // PROTECTED ROUTES
    //     // Show 1
        usersRouter.get('/:id', usersCtrl.show);
    //     // Edit/Update
        usersRouter.patch('/:id', usersCtrl.update);
    //     // Delete
        usersRouter.delete('/:id', usersCtrl.destroy);
    
    // // PROJECTS CRUD ROUTES
    //     // Create project
    //     usersRouter.post('/:id/projects', authenticate, projectsCtrl.create);
    //     // Show all projects
    //     usersRouter.get('/:id/projects', authenticate, projectsCtrl.index);
        
module.exports = usersRouter;