/**
 * Author: Ben Hilarides, Mariea Nies
 * Date: 21 February 2026
 * File: index.spec.js
 * Description: Test the users API
 */

// Require the modules
const request = require('supertest');
const app = require('../../../src/app');
const { mongo } = require('../../../src/utils/mongo');

jest.mock('../../../src/utils/mongo');

// Test the task APIs
describe('Task API Tests', () => {
    beforeEach(() => {
        mongo.mockClear();
    });
    
    // Test the GET /api/tasks - Find all tasks endpoint
    describe('GET /api/tasks - Find all tasks', () => {
        it('should return a 200 status code', async () => {
            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnThis(),
                    find: jest.fn().mockReturnThis(),
                    toArray: jest.fn().mockResolvedValue([
                        {
                            _id: '300000000000000000000001',
                            title: 'Design homepage mockups',
                            description: 'Create initial design mockups',
                            status: 'In Progress',
                            priority: 'High',
                            dueDate: new Date('2026-02-20'),
                            dateCreated: new Date('2026-01-15'),
                            dateModified: new Date('2026-02-18'),
                            projectId: '200000000000000000000001'
                        },
                        {
                            _id: '300000000000000000000002',
                            title: 'Review design mockups',
                            description: 'Present to stakeholders',
                            status: 'Pending',
                            priority: 'High',
                            dueDate: new Date('2026-02-25'),
                            dateCreated: new Date('2026-01-15'),
                            dateModified: new Date('2026-02-18'),
                            projectId: '200000000000000000000001'
                        }
                    ])
                };
                await callback(db);
            });

            const response = await request(app).get('/api/tasks'); // Send a GET request to the /api/task endpoint

            expect(response.status).toBe(200);
        });

        it('should return JSON with success property set to true', async () => {
            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnThis(),
                    find: jest.fn().mockReturnThis(),
                    toArray: jest.fn().mockResolvedValue([
                        {
                            _id: '300000000000000000000001',
                            title: 'Test Task',
                            status: 'Pending',
                            priority: 'Medium'
                        }
                    ])
                };
                await callback(db);
            });

            const response = await request(app).get('/api/tasks');

            expect(response.body).toHaveProperty('success');
            expect(response.body.success).toBe(true);
        });

        it('should return an array of tasks in data property', async () => {
            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnThis(),
                    find: jest.fn().mockReturnThis(),
                    toArray: jest.fn().mockResolvedValue([
                        {
                            _id: '300000000000000000000001',
                            title: 'Design homepage mockups',
                            description: 'Create initial design mockups',
                            status: 'In Progress',
                            priority: 'High',
                            dueDate: new Date('2026-02-20'),
                            dateCreated: new Date('2026-01-15'),
                            dateModified: new Date('2026-02-18'),
                            projectId: '200000000000000000000001'
                            },
                            {
                            _id: '300000000000000000000002',
                            title: 'Review design mockups',
                            description: 'Present to stakeholders',
                            status: 'Pending',
                            priority: 'High',
                            dueDate: new Date('2026-02-25'),
                            dateCreated: new Date('2026-01-15'),
                            dateModified: new Date('2026-02-18'),
                            projectId: '200000000000000000000001'
                        }
                    ])
                };
                await callback(db);
            });

            const response = await request(app).get('/api/tasks');

            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBe(2);

            //Verify task structure
            const task = response.body.data[0];
            expect(task).toHaveProperty('_id');
            expect(task).toHaveProperty('title');
            expect(task).toHaveProperty('status');
            expect(task).toHaveProperty('priority');
            expect(task).toHaveProperty('projectId');
        });
    });
    
    // Mariea's tests converted from TS
    it('should return a 200 status', async () => {
        mongo.mockImplementation(async (callback) => {
            const db = {
                collection: jest.fn().mockReturnThis(),
                find: jest.fn().mockReturnThis(),
                toArray: jest.fn().mockResolvedValue([
                    {
                        _id: '300000000000000000000001',
                        title: 'Test Task',
                        description: 'Test Description',
                        status: 'Pending',
                        priority: 'High',
                        dateCreated: new Date(),
                        dateModified: new Date(),
                        projectId: '200000000000000000000001'  
                    }
                ])
            };
            await callback(db);
        });

        const res = await request(app).get('/api/tasks');
        expect(res.status).toBe(200);
    });

    it('should return response body as object with data array', async () => {
        mongo.mockImplementation(async (callback) => {
            const db = {
                collection: jest.fn().mockReturnThis(),
                find: jest.fn().mockReturnThis(),
                toArray: jest.fn().mockResolvedValue([
                    {
                        _id: '300000000000000000000001',
                        title: 'Test Task',
                        status: 'Pending',
                        priority: 'Medium'
                    }
                ])
            };
            await callback(db);
        });

        const res = await request(app).get('/api/tasks');
        expect(res.body.data).toBeDefined();
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should return tasks from database', async () => {
        const testTask = {
            _id: '300000000000000000000001',
            title: 'Test Task',
            description: 'Created in test',
            status: 'Pending',
            priority: 'Medium',
            dateCreated: new Date(),
            dateModified: new Date(),
            projectId: '200000000000000000000001'
        };

        mongo.mockImplementation(async (callback) => {
            const db = {
                collection: jest.fn().mockReturnThis(),
                find: jest.fn().mockReturnThis(),
                toArray: jest.fn().mockResolvedValue([testTask])
            };
            await callback(db);
            
        });

        const res = await request(app).get('/api/tasks');
            
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0].title).toBe('Test Task');
    });

    describe('POST /api/tasks - Create a new task', () => {
        it('should return a 201 status code', async () => {
            const newTask = {
                title: 'Test Task',
                description: 'Test Description',
                status: 'Pending',
                priority: 'High',
                projectId: '200000000000000000000001',
                dueDate: new Date('2026-02-28')
            };

            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnValue({
                        insertOne: jest.fn().mockResolvedValue({
                            insertedId: '300000000000000000000001' 
                        })
                    })
                };
                await callback(db);
            });

            const response = await request(app)
                .post('/api/tasks')
                .send(newTask);

            expect(response.status).toBe(201);
        });

        it('should return success response with created task data', async () => {
            const newTask = {
                title: 'New Feature Task',
                description: 'Implement new feature',
                status: 'In Progress',
                priority: 'Medium',
                projectId: '200000000000000000000002',
                dueDate: new Date('2026-03-15')
            };

            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnValue({
                        insertOne: jest.fn().mockResolvedValue({
                            insertedId: '300000000000000000000099'
                        })
                    })
                };
                await callback(db);
            });

            const response = await request(app)
                .post('/api/tasks')
                .send(newTask);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.message).toBe('Task created successfully');
        });

        it('should save task with all required fieldsto database', async () => {
            const newTask = {
                title: 'Complete Documentation',
                description: 'Write API docs',
                status: 'Pending',
                priority: 'Low',
                projectId: '200000000000000000000003',
                dueDate: new Date('2026-03-30')
            };

            let savedTask;

            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnValue({
                        insertOne: jest.fn().mockImplementation((task) => {
                            savedTask = task;
                            return Promise.resolve({ insertId: task._id });
                        })
                    })
                };
                await callback(db);
            });

            await request(app)
                .post('/api/tasks')
                .send(newTask);

            expect(savedTask).toBeDefined();
            expect(savedTask.title).toBe(newTask.title);
            expect(savedTask.description).toBe(newTask.description);
            expect(savedTask.status).toBe(newTask.status);
            expect(savedTask.priority).toBe(newTask.priority);
            expect(savedTask.projectId).toBe(newTask.projectId);
            expect(savedTask.dateCreated).toBeDefined();
            expect(savedTask.dateModified).toBeDefined();
        });
    });

    // Tests for PATCH endpoint
    describe('PATCH /api/tasks/:id - Update a task', () => {
        it('should return a 200 status code when updating a task', async () => {
            const taskId = '300000000000000000000001';
            const updatedData = {
                title: 'Updated Task Title',
                status: 'Completed'
            };

            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnValue({
                        findOneAndUpdate: jest.fn().mockResolvedValue({
                            value: {
                                _id: taskId,
                                title: 'Updated Task Title',
                                status: 'Completed',
                                priority: 'High',
                                projectId: '200000000000000000000001'
                            }
                        })
                    })
                };
                await callback(db);
            });

            const response = await request(app)
                .patch(`/api/tasks/${taskId}`)
                .send(updatedData);

            expect(response.status).toBe(200);
        });

        it('should return success response with updated task data', async () => {
            const taskId = '300000000000000000000002';
            const updatedData = {
                title: 'Updated Title',
                description: 'Updated Description',
                status: 'In Progress',
                priority: 'Medium'
            };

            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnValue({
                        findOneAndUpdate: jest.fn().mockResolvedValue({
                            value: {
                                _id: taskId,
                                title: 'Updated Title',
                                description: 'Updated Description',
                                status: 'In Progress',
                                priority: 'Medium',
                                projectId: '200000000000000000000001',
                                dateCreated: new Date('2026-02-15'),
                                dateModified: new Date('2026-02-20'),
                                projectId: '200000000000000000000001'
                            }
                        })
                    })
                };
                await callback(db);
            });

            const response = await request(app)
                .patch(`/api/tasks/${taskId}`)
                .send(updatedData);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task updated successfully');
            expect(response.body.data).toBeDefined();
            expect(response.body.data.title).toBe(updatedData.title);
            expect(response.body.data.status).toBe(updatedData.status);
        });

        it('should return 404 if task to update is not found', async () => {
            const taskId = '999999999999999999999999';
            const updatedData = {
                title: 'Non-existent Task'
            };

            mongo.mockImplementation(async (callback) => {
                const db = {
                    collection: jest.fn().mockReturnValue({
                        findOneAndUpdate: jest.fn().mockResolvedValue({ value: null 
                        })
                    })
                };
                await callback(db);
            });

            const response = await request(app)
                .patch(`/api/tasks/${taskId}`)
                .send(updatedData);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Task not found');
        });
    });
});