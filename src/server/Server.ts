import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Methods } from '../constants/methods/Methods';

export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    switch(req.method) {
      case Methods.GET:
        break;
      case Methods.POST:
        break;
      case Methods.PUT:
        break;
      case Methods.DELETE:
        break;
      default:
    }
  } catch {

  }
});
