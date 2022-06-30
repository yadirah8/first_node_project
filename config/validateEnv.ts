import { cleanEnv, str, port } from "envalid";

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["local", "staging", "production"] }),
    DATABASE_URL: str(),
    DATABASE_NAME: str(),
    PORT: port({ default: 5000 }),
    JWT_SECRET: str(),
    SMTP_USER: str(),
    SMTP_PASS: str(),
    SMTP_HOST: str(),
    SMTP_PORT: str(),
    SMTP_SECURE: str(),
  });
};

export default validateEnv;
