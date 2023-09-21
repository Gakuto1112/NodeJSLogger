/******** オブジェクト型 ********/

/**
 * モジュールのオプションの型
 */
type Options = {
    /** 色付きログを出力するかどうか。ファイル出力の場合は非推奨（制御文字がそのまま出力されるため） */
    coloredLog: boolean,
    /** デバッグレベルのログを出力するかどうか */
    logDebugLevel: boolean
}

/******** グローバル変数 ********/

/**
 * モジュールのオプション
 */
const options: Options = {
    coloredLog: false,
    logDebugLevel: false
}

/******** 関数 ********/

/**
 * ログ関数の呼び出し元のファイルパスを取得する。
 * @returns ログ関数の呼び出し元のファイルパス。パスが取得できなかったらundefinedを返す。
 */
function getCallerFilePath(): string|undefined {
    const error: Error = new Error();
    if(error.stack) {
        const filePath = error.stack.split("\n")[3].replace(/\\/g, "/").match(new RegExp(`(?<=\\(${process.cwd().replace(/\\/g, "/")}).+(?=:\\d+:\\d+\\))`));
        if(filePath) return filePath.toString();
    }
}

/******** オプション操作関数 ********/

/**
 * デバッグレベルのログを出力するかどうかを設定する。
 * @param newValue 設定する新しい値
 */
export function setColoredLog(newValue: boolean): void {
    options.coloredLog = newValue;
}

/**
 * 色付きログを出力するかどうかを設定する。
 * @param newValue 設定する新しい値
 */
export function setLogDebugLevel(newValue: boolean): void {
    options.logDebugLevel = newValue;
}

/******** ログ関数 ********/

/**
 * 標準出力にログを出力する。logDebugがfalseなら出力されない。ログレベル：デバッグ
 * @param message 出力するメッセージ
 */
export function debug(message: string): void {
    if(options.logDebugLevel) console.debug(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[34mDEBUG\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [DEBUG]: ${message}`);
}

/**
 * 標準出力にログを出力する。ログレベル：標準
 * @param message 出力するメッセージ
 */
export function info(message: string): void {
    console.info(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[32mINFO\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [INFO]: ${message}`);
}

/**
 * 標準出力にログを出力する。ログレベル：警告
 * @param message 出力するメッセージ
 */
export function warn(message: string): void {
    console.warn(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[33mWARN\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [WARN]: ${message}`);
}

/**
 * 標準出力にログを出力する。ログレベル：エラー
 * @param message 出力するメッセージ
 */
export function error(message: string): void {
    console.error(options.coloredLog ? `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [\u001b[31mERROR\u001b[0m]: ${message}` : `[${new Date().toLocaleString()}] [${getCallerFilePath()}] [ERROR]: ${message}`);
}