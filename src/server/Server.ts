import { CustomErrors } from './../api/Errors';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Methods } from '../constants/methods/Methods';
import url from 'url';
import { create, deleteUsers, getOneUser, getUsers, update } from '../controller/Controller';
import { errorMessages } from '../constants/errors/Errors';
import { allowableLength, apiPath } from '../constants/path/Path';

export const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const path = url.parse(req.url, true).path;
    const pathLength = path.split('/').length;

    if (!(/\/api\/users/).test(path) || pathLength > allowableLength) {
      const error = CustomErrors.notFound(errorMessages.Invalid_Endpoint);
      throw error;
    }

    res.setHeader("Content-Type", "application/json");
    switch(req.method) {
      case Methods.GET:
        if (path === apiPath) {
          await getUsers(req, res);
        } else {
          await getOneUser(req, res);
        }
        break;
        case Methods.POST:
        if (path !== apiPath) {
          const error = CustomErrors.notFound(errorMessages.Invalid_Endpoint);
          throw error
        }
        await create(req, res);
        break;
      case Methods.PUT:
        await update(req, res);
        break;
      case Methods.DELETE:
        await deleteUsers(req, res);
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
