# NodeJSLogger
This module formats log outputs to make them easy to see!

It adds date and time when the log output, file name that calls log functions, and log type.

```
[2023/9/22 2:54:08] [PluginManager.js] [INFO]: Loading plugins...
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: Started reading config file.
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: Finished reading config file.
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: Checking new config addition...
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: New config values detected. Updating config file...
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: Finished Updating config file.
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: Started config verification.
[2023/9/22 2:54:08] [ConfigManager.js] [INFO]: Finished config verification. No error was found.
[2023/9/22 2:54:08] [LocaleManager.js] [INFO]: Loading locale data...
[2023/9/22 2:54:08] [LocaleManager.js] [INFO]: Finished loading locale data.
[2023/9/22 2:54:08] [MinecraftDiscordChatSync.js] [INFO]: Finished loading.
[2023/9/22 2:54:08] [plugins/Advancements.js] [INFO]: Loading advancements data...
[2023/9/22 2:54:08] [plugins/Death.js] [INFO]: Loading death message data...
[2023/9/22 2:54:08] [LogObserver.js] [INFO]: Started log observation.
[2023/9/22 2:54:08] [BotManager.js] [INFO]: Logging in to bot...
[2023/9/22 2:54:08] [BotManager.js] [ERROR]: Failed to login because provided token was invalid.
```

## Install
### From npm
Just type following command in your Node.js project.

```
npm install @gakuto1112/nodejs-logger
```

### From GitHub repository
1. Download or clone GitHub repository.
   - You can download repository files by clicking green "**<> Code**" button in the upper right corner of the GitHub page.
2. Open terminal.
3. Set current directory to this project.
4. Type `npm install` to install dependencies.
5. type `npm pack` to make a package.
6. Set current directory to your project.
7. Type `npm install <path_to_package_file>` to install this module.

## Usage
```js
const logger = require("nodejs-logger");

/* Debug log. Won't be outputted by default. */
logger.debug("Debug log");

/* Information log.*/
logger.info("Information log");

/* Warning log.*/
logger.warn("Warning log");

/* Error log.*/
logger.error("Error log");
```

## Options
You can change log style by setting module options.

### rootPath
The origin path that used to output relative path from it to caller path when outputting logs. It must be a valid path and a directory path. Otherwise, this module will throw `InvalidPathError`.

The initial value is the current directory of the terminal. You don't have to change this until you want to change module root path.

`setRootPath()` is **an asynchronous function**. Please make sure not to call log function until it returns `resolve`.

```js
const logger = require("nodejs-logger");

/* This log includes the current directory of the terminal. */
logger.info("Prints current directory");

/** Changes module root path. */
logger.setRootPath("/path/to/new/root/path").then(function () => {
   /* This log includes the new root directory. */
   logger.info("Prints new root directory");
});
```

### coloredLog
This option colors log level strings. It makes logs easy to see. However, it is recommended to turn of this option if the log is outputted to the text file (because control characters are outputted as normal characters).

Default value is `false`.

```js
const logger = require("nodejs-logger");

/* Turn on the colored log feature. */
logger.setColoredLog(true);

/* This log will be colored. */
logger.info("Colored log");
```

### setLogDebugLevel
This option determines whether debug level logs should be outputted or not.

Default value is `false`.

```js
const logger = require("nodejs-logger");

/* This log won't be outputted. */
logger.debug("First debug log");

/* Turn on the debug logs. */
logger.setLogDebugLevel(true);

/* This log will be outputted. */
logger.debug("Second debug log");
```

## License
This package is licensed under the MIT License. You are free to use it within the scope of the license.

## Keywords
logger