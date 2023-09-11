const DB_URL: string = process.env.DB_URL ?? "";

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "";

const EMAIL: string = process.env.EMAIL ?? "";
const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD ?? "";

export default {
  db: { url: DB_URL },
  jwt: { secretKey: JWT_SECRET_KEY, expiresIn: JWT_EXPIRES_IN },
  email: { email: EMAIL, password: EMAIL_PASSWORD }
};
