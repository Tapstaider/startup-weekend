framework.logger = ((LOGGER && typeof LOGGER === 'object')?LOGGER:{
    log: console.log,
    trace: console.log,
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
});
