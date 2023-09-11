export interface IUserDocumentProps {
  _id?: string;
  email: string;
  password: string;
  displayName?: string;
  session?: string;
  isActive?: boolean;
  verificationToken?: string | null;
  verificationTokenExpiresAt?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordTokenExpiresAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITodoDocumentProps {
  _id?: string;
  topic: string;
  detail?: string;
  dueDate?: string;
  member?: {
    user_id?: string;
    name?: string;
  }[];
  status?: boolean;
  view?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
