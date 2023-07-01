import { IncomingMessage } from 'http';
import { CustomErrors } from '../api/Errors';
import { errorMessages } from '../constants/errors/Errors';

export const reqBody = async (req: IncomingMessage): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const requestBody: Uint8Array[] = [];
    req.on('data', (chunk) => {
      requestBody.push(chunk);
    });
    req.on('end', () => {
      const data = Buffer.concat(requestBody).toString().trim();
      resolve(JSON.parse(data));
    });
    req.on("error", () => {
      const error = CustomErrors.incorrectRequest(errorMessages.Invalid_UserData);
      reject(error);
    });
  });
};

