const express = require('express');
const router = express.Router();

let projects = [];

router.post('/', (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            message: 'Project name is required'
        });
    }
    
    const project ={
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.priority,
        priority: req.body.priority,
        dueDate: req.body.dueDate
    };

    projects.push(project);

    res.status(201).json({
        success: true,
        data: project
    });

});

module.exports = router;