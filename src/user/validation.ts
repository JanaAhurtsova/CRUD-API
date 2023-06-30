import { BaseUser } from "./types";

export const isUser = (obj: BaseUser): obj is BaseUser => {
  return (
    typeof obj.username === "string" &&
    typeof obj.age === "number" &&
    Array.isArray(obj.hobbies) &&
    obj.hobbies.every((hobby) => typeof hobby === "string")
  );
};
