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
 * @route GET /api/tasks/:id
 * @description GET a single task by ID
 * @returns {Object} - JSON response with task data
 */
router.get('/:id', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            const { ObjectId } = require('mongodb');
            const taskId = req.params.id;

            const task = await db.collection('tasks').findOne({ 
                _id: new ObjectId(taskId) 
            });

            console.log('Task found:', task);

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            res.status(200).json({
                success: true,
                data: task
            });
        }, next);
    } catch (err) {
        console.error('Error fetching task:', err);
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

// Adding PATCH route for edit functionality
/**
 * @route PATCH /api/tasks/:id
 * @description Update an existing task
 * @returns {Object} - JSON response with the updated task
 */

router.patch('/:id', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            const { ObjectId } = require('mongodb');
            const taskId = req.params.id;

            // Build the update object based on provided fields
            const updateFields = {};
            if (req.body.title !== undefined) updateFields.title = req.body.title;
            if (req.body.description !== undefined) updateFields.description = req.body.description;
            if (req.body.status !== undefined) updateFields.status = req.body.status;
            if (req.body.priority !== undefined) updateFields.priority = req.body.priority;
            if (req.body.projectId !== undefined) updateFields.projectId = req.body.projectId;
            if (req.body.dueDate !== undefined) updateFields.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : null;
            updateFields.dateModified = new Date();

            // Always update the dateModified field
            updateFields.dateModified = new Date();

            // Update the task in the database
            const result = await db.collection('tasks').findOneAndUpdate(
                { _id: new ObjectId(taskId) },
                { $set: updateFields },
                { returnDocument: 'after' }
            );

            if (!result.value) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: result.value
            });
        }, next);
    } catch (err) {
        console.error('Error updating task:', err);
        next(err);
    }
});
    
module.exports = router;