import { errorMessages } from "../constants/errors/Errors";
import { BaseUser, User } from "../user/types";
import { v4 as uuidv4 } from "uuid";

let users: User[] = [];

export const getAll = async () => {
  return users;
};

export const getUser = async (id: string) => {
  const user = users.find((user) => user.id === id);

  if(user) {
    return user;
  } else {
    throw new Error(errorMessages[404]);
  }
}

export const createUser = async (userData: BaseUser) => {
  const newUser = { id: uuidv4(), ...userData };
  users.push(newUser);

  return newUser;
}

export const deleteUser = async (id: string) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    users = users.filter((user) => user.id !== id);
  } else {
    throw new Error(errorMessages[404]);
  }
}

export const updateUser = async (id: string, userData: BaseUser) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (!userIndex) {
    throw new Error(errorMessages[404]);
  }
  users[userIndex] = { id, ...userData };
}
