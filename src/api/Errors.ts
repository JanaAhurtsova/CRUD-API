import { errorMessages } from '../constants/errors/Errors';
import { StatusCodes } from '../constants/codes/Codes';

export class CustomErrors extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static serverError() {
    return new CustomErrors(StatusCodes[500], errorMessages.Server_Error);
  }

  static notFound(message: string) {
    return new CustomErrors(StatusCodes[404], message);
  }

  static incorrectRequest(message: string) {
    return new CustomErrors(StatusCodes[400], message);
  }
}
