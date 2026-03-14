const request = require('supertest');
const express = require('express');
const projectRoutes = require('../../../src/routes/project');
const { mongo } = require('../../../src/utils/mongo');

jest.mock('../../../src/utils/mongo');

const app = express();
app.use(express.json());
app.use('/api/projects', projectRoutes);

describe('Project API - Create Project', () => {
    
    // Test One
    it ('should create a new project', async () => {
        
        const response = await request(app)
        .post('/api/projects')
        .send({
            name: 'Website Redesign',
            description: 'Update the company website',
            priority: 'High',
            dueDate: '2026-04-01'
        });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe('Website Redesign');
    });

    // Test Two
    it('should return project data after creation', async () => {
        
        const response = await request(app)
        .post('/api/projects')
        .send({
            name: 'Mobile App',
            description: 'Build a mobile version',
            priority: 'Medium'
        });

        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.name).toBe('Mobile App');
    });

    // Test Three
    it('should return error when project name is missing', async () => {

        const response = await request(app)
        .post('/api/projects')
        .send({
            description: 'Invalid project'
        });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

});

describe('Project API - List all Projects', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test One
    it('should return all projects with a 200 status', async () => {
        const mockProjects = [
            {
                _id: '674a1b2c3d4e5f6a7b8c9d0e',
                name: 'TaskFlo Development',
                description: 'Build task management system',
                priority: 'High',
                dueDate: '2026-04-01'
            },
            {
                _id: '674a1b2c3d4e5f6a7b8c9d0f',
                name: 'Website Redesign',
                description: 'Update header, footer, body',
                priority: 'Medium',
                dueDate: '2026-05-15'

            }
        ];

        mongo.mockImplementation(async (callback) => {
            const db = {
                collection: jest.fn().mockReturnThis(),
                find: jest.fn().mockReturnThis(),
                toArray: jest.fn().mockResolvedValue(mockProjects)
            };
            await callback(db);
        });

        const response = await request(app).get('/api/projects');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBe(2);
        
    });

    // Test Two
    it('should return an empty array when no projects exist', async () => {
        mongo.mockImplementation(async (callback) => {
            const db = {
                collection: jest.fn().mockReturnThis(),
                find: jest.fn().mockReturnThis(),
                toArray: jest.fn().mockResolvedValue([])
            };
            await callback(db);
        });

        const response = await request(app).get('/api/projects');

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('length', 0);
    });

    //Test Three
    it('should return 500 status when database fails', async() => {
        mongo.mockImplementation(async (callback) => {
            const db = {
                collection: jest.fn().mockReturnThis(),
                find: jest.fn().mockReturnThis(),
                toArray: jest.fn().mockRejectedValue(new Error('Database Error'))
            };
            await callback(db);
        });

        const response = await request(app).get('/api/projects');

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
    });
});
