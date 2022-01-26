# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.7](https://github.com/iotakingdoms/auth/compare/v0.0.6...v0.0.7) (2022-01-26)


### Features

* add a '/version' endpoint to get npm package version ([ee5f75e](https://github.com/iotakingdoms/auth/commit/ee5f75ed8a809dc61534048ecbbe54f11b36d4d7))
* add automatic commit hooks to check git message linting and run tests ([8b28748](https://github.com/iotakingdoms/auth/commit/8b28748e7ee75659e78fb7827b1b7e50183244c5))
* add cli parser to support overriding default variables ([3e22657](https://github.com/iotakingdoms/auth/commit/3e2265713c8ac106420e061a91bb582a1b761d04))
* npm script for documentation generation ([540ea6a](https://github.com/iotakingdoms/auth/commit/540ea6a8f6983c7467cbffc06f7dcd2e683c75ab))


### Bug Fixes

* **dockerfile:** run application with 'npm start' instead of 'node dist/start.js' ([92afa6f](https://github.com/iotakingdoms/auth/commit/92afa6f64103c346d173ee670972dd056d57e229))
* simplify log level implementation and usage ([a6f1a38](https://github.com/iotakingdoms/auth/commit/a6f1a3879ba9a4b16895a32c99f99f8fa0ee872d))

### [0.0.6](https://github.com/iotakingdoms/auth/compare/v0.0.5...v0.0.6) (2022-01-18)


### Features

* add plain http server implementation ([53ff600](https://github.com/iotakingdoms/auth/commit/53ff6005970cbb670725d15b86a2923afb5a135d))


### Bug Fixes

* support nested RouteHandlers ([52bcd3e](https://github.com/iotakingdoms/auth/commit/52bcd3e0220b8c0d1d04485f9ea4a876126d0a7d))
* upgraded 'componentsjs' to v5 and 'componentsjs-generator' to v3 ([60078c1](https://github.com/iotakingdoms/auth/commit/60078c1c4e235b938969e6b6fa524b5f25c9ef26))

### [0.0.5](https://github.com/iotakingdoms/auth/compare/v0.0.4...v0.0.5) (2022-01-16)

### [0.0.4](https://github.com/iotakingdoms/auth/compare/v0.0.3...v0.0.4) (2022-01-16)

### [0.0.3](https://github.com/iotakingdoms/auth/compare/v0.0.2...v0.0.3) (2022-01-16)

### [0.0.2](https://github.com/iotakingdoms/auth/compare/v0.0.1...v0.0.2) (2022-01-16)


### Bug Fixes

* optimize docker image size via multi stage build ([d662476](https://github.com/iotakingdoms/auth/commit/d6624763470da9919dce456e86a27033aa6ded56))

### 0.0.1 (2022-01-16)


### Features

* add CI workflow for linting, unit- and integration testing ([4973755](https://github.com/iotakingdoms/auth/commit/497375597a1f9cd38b6a19e993cdf961b8344b1e))
* add express server and metrics endpoint ([7ccadd6](https://github.com/iotakingdoms/auth/commit/7ccadd626d20aecd44dcbc04ca9fba599fa566e7))
* decoupled server middleware handling logic ([1a15f9a](https://github.com/iotakingdoms/auth/commit/1a15f9a759a6229fdc0ad6d16ec171a69d4267c2))
* initial commit ([ce913de](https://github.com/iotakingdoms/auth/commit/ce913de81dcbfcbdd9f5e7774a8e82eea38fc626))
* trying out prom-client ([994f69d](https://github.com/iotakingdoms/auth/commit/994f69dcc7f0699aeae94a34beb60be2e0b10063))


### Bug Fixes

* add readme ([ae5d19d](https://github.com/iotakingdoms/auth/commit/ae5d19d1cecff3318d99a09fbb8063d53498aad0))
* run tests before build job/script ([f89091f](https://github.com/iotakingdoms/auth/commit/f89091f0bca3b6e1c07ffc10bbea049a31a3273b))
* use for-of loop instead ([700d439](https://github.com/iotakingdoms/auth/commit/700d439aacb5f0c143130e88676b08706b3b370e))
