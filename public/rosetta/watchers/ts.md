You can use `nodemon` or `tsc --watch`.

### Using `nodemon`

Visit https://www.npmjs.com/package/nodemon for more details.

You install `nodemon` as a (dev) package and then do something like `nodemon ./server.js arg0 arg1`.

Previously `nodemon` was unable to work with Typescript files, but now it can, by utilizing `ts-node`.

You can configure it all through CLI, `nodemonConfig` region in the `package.json`, or by providing a config file (usually `nodemon.json`).

### Using `tsc --watch`

Visit for https://www.typescriptlang.org/docs/handbook/configuring-watch.html for more details.

You basically configure `watchOptions` region inside your `tsconfig.json` file, and then you can invoke `tsc --watch`.
