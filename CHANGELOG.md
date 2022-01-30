# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.22](https://github.com/iotakingdoms/auth/compare/v0.0.21...v0.0.22) (2022-01-30)

### [0.0.21](https://github.com/iotakingdoms/auth/compare/v0.0.20...v0.0.21) (2022-01-30)

### [0.0.20](https://github.com/iotakingdoms/auth/compare/v0.0.19...v0.0.20) (2022-01-30)

### [0.0.19](https://github.com/iotakingdoms/auth/compare/v0.0.18...v0.0.19) (2022-01-30)

### [0.0.18](https://github.com/iotakingdoms/auth/compare/v0.0.17...v0.0.18) (2022-01-30)

### [0.0.17](https://github.com/iotakingdoms/auth/compare/v0.0.16...v0.0.17) (2022-01-30)

### [0.0.16](https://github.com/iotakingdoms/auth/compare/v0.0.15...v0.0.16) (2022-01-30)

### [0.0.15](https://github.com/iotakingdoms/auth/compare/v0.0.14...v0.0.15) (2022-01-30)

### [0.0.14](https://github.com/iotakingdoms/auth/compare/v0.0.13...v0.0.14) (2022-01-30)


### Bug Fixes

* adjust cluster name ([59a7402](https://github.com/iotakingdoms/auth/commit/59a74023c4b490f0b2cb691ef033731387ca2467))

### [0.0.13](https://github.com/iotakingdoms/auth/compare/v0.0.12...v0.0.13) (2022-01-29)

### [0.0.12](https://github.com/iotakingdoms/auth/compare/v0.0.11...v0.0.12) (2022-01-29)


### Bug Fixes

* add curl to Dockerfile ([25a7256](https://github.com/iotakingdoms/auth/commit/25a7256db90330194daa17bda20114ac182d4e8a))

### [0.0.11](https://github.com/iotakingdoms/auth/compare/v0.0.10...v0.0.11) (2022-01-29)


### Features

* add health endpoint ([a38e3bf](https://github.com/iotakingdoms/auth/commit/a38e3bfceada1cc4085dbe0bfb4d6a2cb7967fd5))


### Bug Fixes

* cover edge case if app fails to initialize ([a582805](https://github.com/iotakingdoms/auth/commit/a5828055e0448d079ecdf8aea5aff9730b9e3532))
* **deps:** update dependency componentsjs to v5.0.0-beta.4 ([cbe993f](https://github.com/iotakingdoms/auth/commit/cbe993f84109d4a785e3e3ebf49b0f06f5b6a4c1))
* incorrect naming of test ([5c1e2b4](https://github.com/iotakingdoms/auth/commit/5c1e2b421b07d8ffabaed6f7a1811e0b90763c63))
* mock yargs in unit test ([ea95270](https://github.com/iotakingdoms/auth/commit/ea952700e6ea4371f184f43025029ab982a18ff7))
* remove unused import ([477551f](https://github.com/iotakingdoms/auth/commit/477551f74867480b53b766677cddce542d12b4e6))
* test app entrypoint ([db92789](https://github.com/iotakingdoms/auth/commit/db92789820f38b659b3b728182bbb58fb75a424e))

### [0.0.10](https://github.com/iotakingdoms/auth/compare/v0.0.9...v0.0.10) (2022-01-29)


### Features

* add SequenceHandler ([48f2e34](https://github.com/iotakingdoms/auth/commit/48f2e3467a10a32f7f8b30a28d499bbc4e56cc41))
* automatically build project upon 'npm install' ([7674997](https://github.com/iotakingdoms/auth/commit/76749972c76f013fcf36874e0a501e7e63bbe30e))


### Bug Fixes

* audit workflow name ([b265460](https://github.com/iotakingdoms/auth/commit/b2654604f454a910b8cc63dfc8ada57f35b1c263))
* missing super initialize & terminate calls ([06cd8ee](https://github.com/iotakingdoms/auth/commit/06cd8ee6f1f701e0f8463562f6e7c58a1262ecdb))
* now npm lint script checks both 'lib' and 'src' directories ([4c85d57](https://github.com/iotakingdoms/auth/commit/4c85d5741fc451a665fb50a7b05f6ac5acdd6118))
* remove unused code ([3454554](https://github.com/iotakingdoms/auth/commit/3454554139dcb80048895ee5a43d84d9cf082434))
* remove unused code ([c4e62d0](https://github.com/iotakingdoms/auth/commit/c4e62d0cad681b148c204c94ef04abce20fe4f2d))

### [0.0.9](https://github.com/iotakingdoms/auth/compare/v0.0.8...v0.0.9) (2022-01-27)

### [0.0.8](https://github.com/iotakingdoms/auth/compare/v0.0.7...v0.0.8) (2022-01-26)


### Features

* e2e tests with puppeteer ([30f4af1](https://github.com/iotakingdoms/auth/commit/30f4af171f198a3388d47a0dfa7a1587e033800c))

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
