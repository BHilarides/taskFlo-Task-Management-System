const request = require('supertest');
const express = require('express');

const projectRoutes = require('./index');

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