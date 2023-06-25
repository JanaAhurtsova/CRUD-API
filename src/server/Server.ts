import http from 'http';
import { Methods } from '../constants/methods/Methods';

export const server = http.createServer((req, res) => {
  switch (req.method) {
    case Methods.GET:
      getReq(req, res);
      break;
    case Methods.POST:
      postReq(req, res);
      break;
    case Methods.PUT:
      putReq(req, res);
      break;
    case Methods.DELETE:
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ title: 'Not found', message: 'Route not found' }));
      res.end();
  }
});
