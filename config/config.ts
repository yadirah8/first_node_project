import * as dotenv from "dotenv";
import * as env from "env-var";
import { string } from "joi";

dotenv.config();
export const SMTP_USER = env.get("SMTP_USER").asString;
export const SMTP_PASS = env.get("SMTP_PASS").asString;
