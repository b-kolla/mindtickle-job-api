// custom logger
module.exports = function() {

    var oldConsoleLog = console.log;

    console.log = function() {
        var newArguments = [new Date().toString(), '-'];
        newArguments = newArguments.concat(Array.prototype.slice.call(arguments));

        oldConsoleLog.apply(console, newArguments);
    };

};