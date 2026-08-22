import * as dotenv from "dotenv";
import * as path from "path";

const env = process.env.env || "dev";
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });

// Loads .env.<env> and exposes the run's environment settings (base URL, browser).
export class EnvHelper {
  static readonly ENV = env;
  static readonly BASE_URL = process.env.BASE_URL || "http://localhost:3000";
  static readonly BROWSER = process.env.browser || "chromium";
}
