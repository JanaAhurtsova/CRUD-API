import { errorMessages } from '../constants/errors/Errors';
import { BaseUser, User } from '../user/types';
import { v4 as uuidv4, validate } from 'uuid';
import { isUser } from '../user/validation';
import { CustomErrors } from './Errors';

let users: User[] = [];

export const getAll = async () => {
  return users;
};

export const getUser = async (id: string) => {
  if (validate(id)) {
    const user = users.find((user) => user.id === id);
  
    if (user) {
      return user;
    } else {
      const error = CustomErrors.notFound(errorMessages.Not_Found);
      throw error;
    }
  }

  const error = CustomErrors.incorrectRequest(errorMessages.Invalid_ID);
  throw error;
};

export const createUser = async (userData: unknown) => {
  if (isUser(userData)) {
    const newUser = { id: uuidv4(), ...userData as BaseUser };
    users.push(newUser);
    return newUser;
  }

  const error = CustomErrors.notFound(errorMessages.Invalid_UserData);
  throw error;
};

export const deleteUser = async (id: string) => {
  if (validate(id)) {
    const user = users.find((user) => user.id === id);
    if (user) {
      users = users.filter((user) => user.id !== id);
      return users;
    } else {
      const error = CustomErrors.notFound(errorMessages.Not_Found);
      throw error;
    }
  }

  const error = CustomErrors.incorrectRequest(errorMessages.Invalid_ID);
  throw error;
};

export const updateUser = async (id: string, userData: unknown) => {
  if (!validate(id)) {
    const error = CustomErrors.incorrectRequest(errorMessages.Invalid_ID);
    throw error;
  }

  if (!isUser(userData)) {
    const error = CustomErrors.notFound(errorMessages.Invalid_UserData);
    throw error;
  }
  
  const userIndex = users.findIndex((user) => user.id === id);
  if (!userIndex) {
    const error = CustomErrors.notFound(errorMessages.Not_Found);
    throw error;
  }
  users[userIndex] = { id, ...userData as BaseUser };
  return users[userIndex];
};
