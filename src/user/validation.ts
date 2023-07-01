import { BaseUser } from "./types";

export const isUser = (data: Partial<BaseUser>) => {
  return (
    typeof data.username === "string" &&
    typeof data.age === "number" &&
    Array.isArray(data.hobbies) &&
    data.hobbies.every((hobby) => typeof hobby === "string")
  );
};
