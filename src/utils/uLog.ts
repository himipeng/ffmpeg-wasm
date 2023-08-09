export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    // HTTP = 3,
    // VERBOSE = 4,
    DEBUG = 5,
}

const colorsConfig = {
    [LogLevel.DEBUG]: { color: 'white', bgColor: 'green' },
    [LogLevel.INFO]: { color: 'white', bgColor: 'blue' },
    [LogLevel.WARN]: { color: 'black', bgColor: 'yellow' },
    [LogLevel.ERROR]: { color: 'white', bgColor: 'red' },
}

export const uLog = (level: LogLevel, ...args: unknown[]) => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const time = new Date().toISOString().substring(11, 23)

    const colors = colorsConfig[level]
    const styles = [
        `color: ${colors.color}`,
        `background-color: ${colors.bgColor}`,
        'padding: 2px 4px',
        'border-radius: 2px',
    ].join(';')
    console.log(`%c[${time}] ${LogLevel[level]}`, styles, ...args)
}
