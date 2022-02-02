import { Test1Component } from "./Test1Component";

export interface Test1AppArgs {
  test1Component: Test1Component;
}

export class Test1App {
  private readonly test1Component: Test1Component;

  constructor(args: Test1AppArgs) {
    this.test1Component = args.test1Component;
  }

  run() {
    console.log("Running Test1App");
    this.test1Component.sayHi();
  }
}