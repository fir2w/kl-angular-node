/**
 * @author ww <blackbarn@gmail.com>
 * @since 10/10/13 4:33 PM
 */

// Local Dependencies
var settingService = require('nconf');
var loggerDefaults = require('./config');
var LogService = require('./log');


module.exports = new LogService(settingService, loggerDefaults);