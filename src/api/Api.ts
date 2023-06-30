import { errorMessages } from '../constants/errors/Errors';
import { BaseUser, User } from '../user/types';
import { v4 as uuidv4, validate } from 'uuid';
import { isUser } from '../user/validation';

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
      throw new Error(errorMessages[404]);
    }
  }

  throw new Error();
};

export const createUser = async (userData: BaseUser) => {
  if (isUser(userData)) {
    const newUser = { id: uuidv4(), ...userData };
    users.push(newUser);

    return newUser;
  }

  return 
};

export const deleteUser = async (id: string) => {
  if (validate(id)) {
    const user = users.find((user) => user.id === id);
    if (user) {
      users = users.filter((user) => user.id !== id);
    } else {
      throw new Error(errorMessages[404]);
    }
  }

  return
};

export const updateUser = async (id: string, userData: BaseUser) => {
  if (!validate(id)) {
    return
  }

  if (!isUser(userData)) {
    return
  }
  
  const userIndex = users.findIndex((user) => user.id === id);
  if (!userIndex) {
    throw new Error(errorMessages[404]);
  }
  users[userIndex] = { id, ...userData };
};
