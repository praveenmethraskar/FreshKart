import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dateTime = new Date().toISOString()


/**
 * A logger object for outputting messages with contextual information such as file and line number.
 * @type {Object}
 * @property {Function} info - Logs an informational message.
 * @property {Function} error - Logs an error message.
 * @property {Function} warn - Logs a warning message.
 * @property {Function} debug - Logs a debug message, but only in development environment.
 */
const logger = {
    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    info: function (message) {
        const callerInfo = getCallerFileAndLine()
        const trimmedMessage = trimJsonValues(message)
        console.log(`[${dateTime}] [INFO] [${path.basename(callerInfo.file)}:${callerInfo.line}] ${trimmedMessage}`)
    },

    /**
     * Logs an error message.
     * @param {string} message - The error message to log.
     */
    error: function (message) {
        const callerInfo = getCallerFileAndLine()
        const trimmedMessage = trimJsonValues(message)
        console.error(`[${dateTime}] [ERROR] [${path.basename(callerInfo.file)}:${callerInfo.line}] ${trimmedMessage}`)
    },

    /**
     * Logs a warning message.
     * @param {string} message - The warning message to log.
     */
    warn: function (message) {
        const callerInfo = getCallerFileAndLine()
        const trimmedMessage = trimJsonValues(message)
        console.error(`[${dateTime}] [WARN] [${path.basename(callerInfo.file)}:${callerInfo.line}] ${trimmedMessage}`)
    },

    /**
     * Logs a debug message, but only in development environment.
     * @param {string} message - The debug message to log.
     */
    debug: function (message) {
        const callerInfo = getCallerFileAndLine()
        let environment = process.env.NODE_ENV
        if (environment == 'development') {
            const trimmedMessage = trimJsonValues(message)
            console.error(`[${dateTime}] [DEBUG] [${path.basename(callerInfo.file)}:${callerInfo.line}] ${trimmedMessage}`)
        }
        if (environment == 'testing') {
            console.error(`[${dateTime}] [DEBUG] [${path.basename(callerInfo.file)}:${callerInfo.line}] ${message}`)
        }
    }
}

function trimJsonValues(json, maxValueLength = 1000) {
    if (typeof json !== 'object' || json === null) {
      // If the value is a string and its length exceeds the maxValueLength, truncate it
      return typeof json === 'string' && json.length > maxValueLength
        ? json.slice(0, maxValueLength) + '...'
        : json
    }
  
    const trimmedObj = {}
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        trimmedObj[key] = trimJsonValues(json[key], maxValueLength)
      }
    }
    return trimmedObj
  }


/**
 * Retrieves the file and line number of the caller of the function.
 * Uses the V8 Error stack trace to determine the caller's information.
 * @returns {Object|null} An object containing `file` (the file path) and `line` (the line number) of the caller,
 *                        or `null` if caller information could not be determined.
 */
function getCallerFileAndLine() {
    const originalFunc = Error.prepareStackTrace

    let callerInfo
    try {
        const err = new Error()
        let currentFile, currentLine
        let current, previous

        Error.prepareStackTrace = (err, stack) => stack

        current = err.stack.shift()
        currentFile = fileURLToPath(current.getFileName())
        currentLine = current.getLineNumber()

        while (err.stack.length) {
            previous = current
            current = err.stack.shift()

            if (currentFile !== fileURLToPath(current.getFileName())) {
                callerInfo = {
                    file: fileURLToPath(current.getFileName()),
                    line: current.getLineNumber()
                }
                break
            }
        }
    } catch (e) { }

    Error.prepareStackTrace = originalFunc

    return callerInfo
}

export default logger
