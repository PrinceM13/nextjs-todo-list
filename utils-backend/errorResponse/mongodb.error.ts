import type { Error } from "mongoose";

interface MongodbErrorStatus {
  [key: string]: number;
}

const mongodbErrorStatus: MongodbErrorStatus = {
  ValidationError: 400
};

export default function mongodbErrorResponse(error: Error) {
  const { name, message } = error;
  return { message, status: mongodbErrorStatus[name] ?? 500 };
}
