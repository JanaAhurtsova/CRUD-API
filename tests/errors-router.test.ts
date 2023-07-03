import request from 'supertest';
import { server } from '../src/server/Server';
import { invalidData, mockBody, mockId, mockUpdate, notExistId } from './constants';
import { StatusCodes } from '../src/constants/codes/Codes';
import { errorMessages } from '../src/constants/errors/Errors';

describe('check router errors', () => {
  beforeAll(async () => {
    await request(server).post('/api/users').send(mockBody);
  });

  afterAll((done) => {
    done();
    server.close();
  });

  it('should get id is invalid error in get request', async () => {
    const res = await request(server).get('/api/users/invalid-id');
    expect(res.statusCode).toBe(StatusCodes[400]);
    expect(res.body.message).toBe(errorMessages.Invalid_ID);
  });

  it('should get id is invalid error in put request', async () => {
    const res = await request(server).put('/api/users/invalid-id').send(mockUpdate);
    expect(res.statusCode).toBe(StatusCodes[400]);
    expect(res.body.message).toBe(errorMessages.Invalid_ID);
  });

  it('should get id is invalid error in delete request', async () => {
    const res = await request(server).delete('/api/users/invalid-id');
    expect(res.statusCode).toBe(StatusCodes[400]);
    expect(res.body.message).toBe(errorMessages.Invalid_ID);
  });

  it('should get user data is invalid error in post request', async () => {
    const res = await request(server).post(`/api/users`).send(invalidData);
    expect(res.statusCode).toBe(StatusCodes[400]);
    expect(res.body.message).toBe(errorMessages.Invalid_UserData);
  });

  it("should get user doesn't exist error in get request", async () => {
    const res = await request(server).get(`/api/users/${notExistId}`);
    expect(res.statusCode).toBe(StatusCodes[404]);
    expect(res.body.message).toBe(errorMessages.Not_Found);
  });

  it("should get user doesn't exist error in put request", async () => {
    const res = await request(server).put(`/api/users/${notExistId}`).send(mockUpdate);
    expect(res.statusCode).toBe(StatusCodes[404]);
    expect(res.body.message).toBe(errorMessages.Not_Found);
  });

  it('should get invalid method error', async () => {
    const res = await request(server).patch(`/api/users/${mockId}`).send(mockUpdate);
    expect(res.statusCode).toBe(StatusCodes[400]);
    expect(res.body.message).toBe(errorMessages.Invalid_Method);
  });
});
