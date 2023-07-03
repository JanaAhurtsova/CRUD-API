import request from 'supertest';
import { server } from '../src/server/Server';
import { StatusCodes } from '../src/constants/codes/Codes';

const mockBody = {
  username: 'test',
  age: 2023,
  hobbies: ['js', 'nodejs'],
};

const mockUpdate = {
  username: 'nodeJs',
  age: 2023,
  hobbies: ['js', 'nodejs'],
};

const mockId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
const regExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

jest.mock('uuid', () => ({ v4: () => mockId, validate: (value: string) => regExp.test(value) }));

describe('check router api', () => {
  afterAll((done) => {
    done();
    server.close();
  });

  it('should get all records with a GET api/users request', async () => {
    const users = await request(server).get('/api/users');
    expect(users.statusCode).toBe(StatusCodes[200]);
    expect(users.body).toEqual([]);
  });

  it('should create new object by a POST api/users request', async () => {
    const res = await request(server).post('/api/users').send(mockBody);
    expect(res.statusCode).toBe(StatusCodes[201]);
    expect(res.body).toEqual({ id: res.body.id, ...mockBody });
  });

  it('should get the created record by its id', async () => {
    const userById = await request(server).get(`/api/users/${mockId}`);
    expect(userById.statusCode).toBe(StatusCodes[200]);
    expect(userById.body).toEqual({ id: mockId, ...mockBody });
  });

  it('should update the created record with a PUT api/users/{userId}request', async () => {
    const updatedUser = await request(server).put(`/api/users/${mockId}`).send(mockUpdate);
    expect(updatedUser.statusCode).toBe(StatusCodes[200]);
    expect(updatedUser.body).toEqual({ id: mockId, ...mockUpdate });
  });

  it('should delete the created object by id', async () => {
    const deletedUser = await request(server).delete(`/api/users/${mockId}`);
    expect(deletedUser.statusCode).toBe(StatusCodes[204]);
  });

  it('should get a deleted object by id', async () => {
    const users = await request(server).get(`/api/users/${mockId}`);
    expect(users.statusCode).toBe(StatusCodes[404]);
    expect(users.body).toStrictEqual({
      message: "User doesn't exist",
    });
  });
});
