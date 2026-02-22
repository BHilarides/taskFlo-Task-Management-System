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
    
module.exports = router;