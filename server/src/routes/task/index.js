/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 21 February 2026
 * File: index.js
 * Description: Routes for task APIs
 */

const express = require('express');
const router = express.Router();
const { mongo } = require('../../utils/mongo');

/**
 * @route GET /api/tasks
 * @description Get all tasks
 * @returns {Object} - JSON response with all tasks
 */

router.get('/', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            const tasks = await db.collection('tasks').find({}).toArray();

            res.json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        }, next);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        next(err);
    }
});

/**
 * @route POST /api/tasks
 * @description Create a new task
 * @returns {Object} - JSON response with the created task
 */
router.post('/', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            const { ObjectId} = require('mongodb');

            // Create new task object
            const newTask = {
                _id: new ObjectId().toString(),
                title: req.body.title,
                description: req.body.description || '',
                status: req.body.status,
                priority: req.body.priority,
                projectId: req.body.projectId,
                dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
                dateCreated: new Date(),
                dateModified: new Date()
            };

            // Insert the new task into the database
            await db.collection('tasks').insertOne(newTask);

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: newTask
            });
        }, next);
    } catch (err) {
        console.error('Error creating task:', err);
        next(err);
    }
});
    
module.exports = router;