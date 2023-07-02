import { IncomingMessage, ServerResponse } from "http";
import { createUser, deleteUser, getAll, getUser, updateUser } from "../api/Api";
import { StatusCodes } from "../constants/codes/Codes";
import url from "url";
import { reqBody } from "./ReqBody";

export const getUsers = async (_: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const users = await getAll();
  sendResponse(res, users);
}

export const getOneUser = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const id = getId(req);
  const users = await getUser(id);
  sendResponse(res, users);
}

export const update = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const id = getId(req);
  const userData = await reqBody(req);
  const user = await updateUser(id, userData);
  sendResponse(res, user);
}

export const create = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const userData = await reqBody(req);
  const user = await createUser(userData);
  sendResponse(res, user, StatusCodes[201]);
}

export const deleteUsers = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const id = getId(req);
  const user = await deleteUser(id);
  sendResponse(res, user, StatusCodes[204]);
}

const sendResponse = <T>(res: ServerResponse<IncomingMessage>, data: T, status = StatusCodes[200]) => {
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

const getId = (req: IncomingMessage) => {
  const urlRequest = url.parse(req.url, true);
  const id = urlRequest.path.split('/').at(3);
  return id;
}
