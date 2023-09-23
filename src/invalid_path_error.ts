/**
 * The error type of "InvalidPathError"
 */
type ErrorType = "PATH_NOT_FOUND" | "PERMISSION_DENIED" | "PATH_IS_FILE" | "UNKNOWN";

/**
 * The error class thrown when the specified directory path is invalid ("directory not found" or "directory is a file")
 */
export class InvalidPathError extends Error {
    /**
     * Constructor
     * @param errorType Error type to throw
     */
    constructor(errorType: ErrorType) {
        const errorMessages: {[key: string]: string} = {
            PATH_NOT_FOUND: "The specified path was not found.",
            PERMISSION_DENIED: "Permission denied.",
            PATH_IS_FILE: "The specified path is a file.",
            UNKNOWN: "An unknown error occurred."
        };
        super(errorMessages[errorType]);
    }
}