const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "";

export default {
  db: { url: process.env.DB_URL ?? "" },
  jwt: { secretKey: JWT_SECRET_KEY, expiresIn: JWT_EXPIRES_IN }
};
