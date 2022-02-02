"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1App = void 0;
class Test1App {
    constructor(args) {
        this.test1Component = args.test1Component;
    }
    run() {
        console.log("Running Test1App");
        this.test1Component.sayHi();
    }
}
exports.Test1App = Test1App;
//# sourceMappingURL=Test1App.js.map