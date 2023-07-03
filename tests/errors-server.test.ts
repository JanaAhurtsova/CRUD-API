import request from 'supertest';
import { StatusCodes } from '../src/constants/codes/Codes';
import { errorMessages } from '../src/constants/errors/Errors';
import { server } from '../src/server/Server';
import { mockBody, mockId, mockUpdate } from './constants';

jest.mock('uuid', () => ({ v4: () => mockId }));

describe('check server errors', () => {
  beforeAll(async () => {
    await request(server).post('/api/users').send(mockBody);
  });

  afterAll((done) => {
    done();
    server.close();
  });

  it('should get invalid endpoint error', async () => {
    const res = await request(server).get(`/api/users/users/test`);
    expect(res.statusCode).toBe(StatusCodes[404]);
    expect(res.body.message).toBe(errorMessages.Invalid_Endpoint);
  });

  it('should get server error by sending get request', async () => {
    const userById = await request(server).get(`/api/users/${mockId}`);
    expect(userById.statusCode).toBe(StatusCodes[500]);
    expect(userById.body.message).toEqual(errorMessages.Server_Error);
  });

  it('should get server error by sending put request', async () => {
    const updatedUser = await request(server).put(`/api/users/${mockId}`).send(mockUpdate);
    expect(updatedUser.statusCode).toBe(StatusCodes[500]);
    expect(updatedUser.body.message).toEqual(errorMessages.Server_Error);
  });
});
