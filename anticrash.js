module.exports = (client) => {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
    });

    process.on('uncaughtExceptionMonitor', (error) => {
        console.error('Uncaught Exception (Monitor):', error);
    });

    process.on('warning', (warning) => {
        console.warn('Warning:', warning);
    });

    console.log('Anticrash system loaded successfully.');
};
