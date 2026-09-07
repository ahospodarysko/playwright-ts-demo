import { logStep as allureLogStep } from "allure-js-commons";

// Prints timestamped step logs to make test/page-object actions visible in the console,
// and records each one as an Allure step so it shows up in the report.
export class LoggerHelper {
  static async logStep(message: string): Promise<void> {
    console.log(`${new Date().toISOString().slice(0, 19)} | STEP | ${message}`);
    await allureLogStep(message);
  }
}
