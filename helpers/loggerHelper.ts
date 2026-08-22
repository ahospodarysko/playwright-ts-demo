// Prints timestamped step logs to make test/page-object actions visible in the console.
export class LoggerHelper {
  static logStep(message: string): void {
    console.log(`${new Date().toISOString().slice(0, 19)} | STEP | ${message}`);
  }
}
