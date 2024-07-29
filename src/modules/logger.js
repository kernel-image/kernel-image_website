const logger = (function () {
    const log = (message) => {
        console.log(message);
    }
    return {log};
})();

export {logger};