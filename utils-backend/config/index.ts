const DB_URL: string = process.env.DB_URL ?? "";

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "";

const EMAIL: string = process.env.EMAIL ?? "";
const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD ?? "";
const RESEND_EMAIL_API_KEY: string = process.env.RESEND_EMAIL_API_KEY ?? "";

const NEXT_PUBLIC_API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
const NEXT_PUBLIC_WEB_URL_URL: string = process.env.NEXT_PUBLIC_WEB_URL_URL ?? "";

export default {
  db: { url: DB_URL },
  jwt: { secretKey: JWT_SECRET_KEY, expiresIn: JWT_EXPIRES_IN },
  email: { email: EMAIL, password: EMAIL_PASSWORD },
  url: { apiUrl: NEXT_PUBLIC_API_URL, webUrl: NEXT_PUBLIC_WEB_URL_URL },
  resend: { apiKey: RESEND_EMAIL_API_KEY }
};
