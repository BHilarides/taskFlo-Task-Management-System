import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { Task } from '../src/models/task.model';

beforeAll(async () => {
const uri = process.env.MONGO_TEST-URI;
if (!uri) throw new Error('MONGO_TEST_URI not defined');

await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
})

describe('GET /api/tasks', () => {

    it('should return 200 status', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.status).toBe(200);
    });

    it('should return an array', async () => {
        const res = await request(app).get('/api/tasks');
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return tasks from database', async () => {
        await Task.create({ title: 'Test Task' });
    });
});

