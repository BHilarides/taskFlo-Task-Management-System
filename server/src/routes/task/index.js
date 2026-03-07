/**
 * Authors: Ben Hilarides, Mariea Nies
 * Date: 21 February 2026
 * File: index.js
 * Description: Routes for task APIs
 */

const express = require('express');
const router = express.Router();
const { mongo } = require('../../utils/mongo');
const { ObjectId } = require('mongodb');

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
 * @description Get a single task by ID
 * @returns {Object} - JSON response with task data
 * @author: Mariea Nies
 */
router.get('/:id', async (req, res, next) => {
    try {
        const taskId = req.params.id;
   

    // Validate ID format
    const isValidId = /^[a-f\d]{24}$/i.test(taskId);
    if(!isValidId) {
        return res.status(400).json({
            success:false,
            message: 'Invalid task ID'
        });
    }

    
        await mongo(async (db) => {
            const task = await db.collection('tasks').findOne({ 
                _id: new ObjectId(taskId) 
            });

            if (!task) {
                return res.status(404).json({
                    success:false,
                    message: 'Task not found'
                })
            }    

            // Success
            res.status(200).json({
                success: true,
                data: task
            });
        }, next);

    } catch (err) {
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
                _id: new ObjectId(),
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
 * @returns {Object} - JSON response for updating task
 * @author Ben Hilarides
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

// Adding delete task route  BH 3-6-2026
/**
 * @route DELETE /api/tasks/:id
 * @description Deletes a specified task
 * @returns {Object} - JSON response for deleted task
 * @author Ben Hilarides
 */

router.delete('/:id', async (req, res, next) => {
    try {
        await mongo(async (db) => {
            const taskId = req.params.id;

            // Validate ID format
            const isValidId = /^[a-f\d]{24}$/i.test(taskId);
            
            if(!isValidId) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid task ID'
                });
            }

            // Delete the task
            const result = await db.collection('tasks').deleteOne({
                _id: new ObjectId(taskId)
            });

            // Confirm task found and deleted
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found, please try again'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Task Deleted Successfully'
            });
        }, next);
    } catch (err) {
        console.error('Error deleting task:', err);
        next(err);
    }
});

module.exports = router;