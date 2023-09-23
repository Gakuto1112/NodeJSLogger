/******** OBJECT TYPES ********/

/**
 * Module options type
 */
type Options = {
    /** Root path of this module. Logs include relative paths from the root path to the caller path. */
    rootPath: string,
    /** Whether to output colored logs or not. Deprecated for file output (because control characters are outputted as normal characters). */
    coloredLog: boolean,
    /** Whether to output debug level logs or not. */
    logDebugLevel: boolean
}

/******** GLOBAL VARIABLES ********/

/**
 * Module options
 */
const options: Options = {
    rootPath: process.cwd().replace(/\\/g, "/"),
    coloredLog: false,
    logDebugLevel: false
}

/******** FUNCTIONS ********/

/**
 * Gets the full file path of the file that called this function.
 * @returns The full file path of the file that called this function. Returns `undefined` is the file path cannot be obtained.
 */
function getCallerFilePath(): string|undefined {
    const error: Error = new Error();
    if(error.stack) {
        const filePath = error.stack.split("\n")[3].replace(/\\/g, "/").match(new RegExp(`(?<=\\(${options.rootPath}).+(?=:\\d+:\\d+\\))`));
        if(filePath) return filePath.toString();
    }
}

/******** OPTION CONTROL FUNCTIONS ********/

/**
 * Sets whether to output colored logs or not.
 * @param newValue New value
 */
export function setColoredLog(newValue: boolean): void {
    options.coloredLog = newValue;
}

/**
 * Sets whether to output debug level logs or not.
 * @param newValue New value
 */
export function setLogDebugLevel(newValue: boolean): void {
    options.logDebugLevel = newValue;
}

/******** LOG FUNCTIONS ********/

/**
 * Outputs a log message. It won't be outputted if `logDebugLevel` is `false`. Log level: **DEBUG**
 * @param message A message to output
 */
export function debug(message: string): void {
    if(options.logDebugLevel) console.debug(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[34mDEBUG\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [DEBUG]: ${message}`);
}

/**
 * Outputs an information message. Log level: **INFO**
 * @param message A message to output
 */
export function info(message: string): void {
    console.info(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[32mINFO\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [INFO]: ${message}`);
}

/**
 * Outputs a warning message. Log level: **WARN**
 * @param message A message to output
 */
export function warn(message: string): void {
    console.warn(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[33mWARN\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [WARN]: ${message}`);
}

/**
 * Outputs an error message. Log level: **ERROR**
 * @param message A message to output
 */
export function error(message: string): void {
    console.error(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[31mERROR\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [ERROR]: ${message}`);
}