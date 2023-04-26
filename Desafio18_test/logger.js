import log4js from 'log4js'

log4js.configure({
    appenders: {
        consola: { type: 'console' },
        archivoWarnings: { type: 'file', filename: 'warn.log' },
        archivoErrores: { type: 'file', filename: 'error.log' },

    },
    categories: {
        default: { appenders: ['consola'], level: 'all' },
        archivowarn: { appenders: ['archivoWarnings'], level: 'warn' },
        archivoerror: { appenders: ['archivoErrores'], level: 'error' }
    }
}
)

export default log4js

