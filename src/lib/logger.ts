export class Logger {
  private topic: string;

  public constructor(topic: string) {
    this.topic = topic;
  }

  private isProduction = () => process.env.NODE_ENV === 'production';

  private getFormatedDate = () => {
    const date = new Date(Date.now());
    return `[${date.toISOString()}]`;
  };

  private print(
    printMethod: (...args: any[]) => void,
    args: any[],
    onlyPrintInDev?: boolean
  ): void {
    if (onlyPrintInDev && this.isProduction()) {
      return;
    }

    printMethod(this.getFormatedDate(), this.topic, '\t', ...args);
  }

  public log(...args: any[]): void {
    this.print(console.log, args, true);
  }

  public warn(...args: any[]): void {
    this.print(console.warn, args);
  }

  public error(...args: any[]): void {
    this.print(console.error, args);
  }

  public info(...args: any[]): void {
    this.print(console.info, args, true);
  }
}
