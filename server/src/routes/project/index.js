const express = require('express');
const router = express.Router();
const { mongo } = require('../../utils/mongo');
const { ObjectId } = require('mongodb');

/**
 * @route GET /api/projects
 * @description Get all projects
 * @returns {Object} - JSON response with array of projects
 * @author Ben Hilarides
 */
router.get('/', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            const projects = await db.collection('projects').find({}).toArray();

            res.status(200).json({
                success: true,
                count: projects.length,
                data: projects
            });
        }, next);
    } catch (err) {
        console.error('Error fetching projects', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.post('/', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            if (!req.body.name) {
                return res.status(400).json({
                    success: false,
                    message: 'Project name is required'
                });
            }
    
            const project ={
                id: new ObjectId(),
                name: req.body.name,
                description: req.body.priority,
                priority: req.body.priority,
                dueDate: req.body.dueDate
            };

            await db.collection('projects').insertOne(project);

            res.status(201).json({
                success: true,
                data: project
            });
        }, next);
    } catch (err) {
        console.error('Error creating project:', err);
        next(err);
    }
});

module.exports = router;