import fs from "fs";
import { platform } from "os";
import { InvalidPathError } from "./invalid_path_error";

/******** OBJECT TYPES ********/

/**
 * Module options type
 */
type Options = {
    /** Root path of this module. Logs include relative paths from the root path to the caller path. */
    rootPath: string[],
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
    rootPath: process.cwd().split(/[\/\\]/),
    coloredLog: false,
    logDebugLevel: false
}

/******** FUNCTIONS ********/

/**
 * Gets the full file path of the file that called this function.
 * @returns The full file path of the file that called this function. Returns `undefined` is the file path cannot be obtained.
 */
function getCallerFilePath(): string | undefined {
    const stackPrev: ((error: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined = Error.prepareStackTrace;
    const stackCountPrev: number = Error.stackTraceLimit;
    Error.prepareStackTrace = (_error: Error, stackTraces: NodeJS.CallSite[]) => {
        const filePath: string | undefined = stackTraces[2].getFileName();
        if(filePath != undefined) return filePath;
    };
    Error.stackTraceLimit = 3;
    const stack: string | undefined = new Error().stack;
    Error.prepareStackTrace = stackPrev;
    Error.stackTraceLimit = stackCountPrev;
    if(stack != undefined) {
        const callerPath: string[] = stack.split(/[\/\\]/);
        let depthIndex: number = 0;
        for(; depthIndex < Math.min(options.rootPath.length, callerPath.length); depthIndex++) {
            if(options.rootPath[depthIndex] != callerPath[depthIndex]) break;
        }
        if(depthIndex == 0) {
            //The caller path is completely different from the root path.
            return callerPath.join(platform() != "win32" ? "/" : "\\");
        }
        else if(depthIndex < options.rootPath.length) {
            //The caller path is branching off from hte middle of the root path.
            if(platform() != "win32") return `${"../".repeat(options.rootPath.length - depthIndex)}${callerPath.slice(depthIndex - callerPath.length).join("/")}`;
            else return `${"..\\".repeat(options.rootPath.length - depthIndex)}${callerPath.slice(depthIndex - callerPath.length).join("\\")}`;

        }
        else {
            //The caller path is followed by the root path.
            if(platform() != "win32") return `./${callerPath.slice(depthIndex - callerPath.length).join("/")}`;
            else return `.\\${callerPath.slice(depthIndex - callerPath.length).join("\\")}`;
        }
    }
}

/******** OPTION CONTROL FUNCTIONS ********/

/**
 * Gets current module root path.
 * @returns Current root path
 */
export function getRootPath(): string {
    return options.rootPath.join(platform() != "win32" ? "/" : "\\");
}

/**
 * Sets module root path. This is used to print relative path when outputting logs.
 * @param newPath New path to set
 * @throws {InvalidPathError} If specified path does not exist or is a file
 */
export async function setRootPath(newPath: string): Promise<void> {
    try {
        const stats: fs.Stats = fs.statSync(newPath);
        if(!stats.isFile()) {
            options.rootPath = newPath.split(/[\/\\]/);
            return;
        }
        else throw new InvalidPathError("PATH_IS_FILE");
    }
    catch(error: any) {
        switch(error.code) {
            case "ENOENT":
                //Directory not found
                throw new InvalidPathError("PATH_NOT_FOUND");
                break;
            case "EPERM":
                //Permission denied
                throw new InvalidPathError("PERMISSION_DENIED");
                break;
            default:
                //Other errors
                console.log(error.code);
                break;
        }
    }
}

/**
 * Gets whether to output colored logs or not.
 * @return Whether to output colored logs or not.
 */
export function getColoredLog(): boolean {
    return options.coloredLog;
}

/**
 * Sets whether to output colored logs or not.
 * @param newValue New value
 */
export function setColoredLog(newValue: boolean): void {
    options.coloredLog = newValue;
}

/**
 * Gets whether to output debug level logs or not.
 * @return Whether to output debug level logs or not
 */
export function getLogDebugLevel(): boolean {
    return options.logDebugLevel;
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