const { interfaces } = require("mocha");

module.exports = {
    skipFiles: ['Token.sol', 'token2.sol', 'WrappedToken.sol', "interface"],
    configureYulOptimizer:true,
    measureFunctionCoverage:true
};