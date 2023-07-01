import { CustomErrors } from './../api/Errors';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Methods } from '../constants/methods/Methods';
import url from 'url';
import { create, getOneUser, getUsers, update } from '../controller/Controller';
import { errorMessages } from '../constants/errors/Errors';

export const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    res.setHeader("Content-Type", "application/json");
    switch(req.method) {
      case Methods.GET:
        if (url.parse(req.url, true).path === '/api/users') {
          await getUsers(req, res);
        } else {
          await getOneUser(req, res);
        }
        break;
        case Methods.POST:
        await create(req, res);
        break;
      case Methods.PUT:
        await update(req, res);
        break;
      case Methods.DELETE:
        break;
      default:
        const error = CustomErrors.incorrectRequest(errorMessages.Invalid_Method);
        throw error;
    }
  } catch(err) {
    const { status, message } = err instanceof CustomErrors ? err : CustomErrors.serverError();
    res.statusCode = status;
    res.end(JSON.stringify({ message }));
  }
});
