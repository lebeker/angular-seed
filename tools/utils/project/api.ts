import Config from '../../config';

/**
 * Starts a new `API` server, serving the static unit test code coverage report.
 */
export function serveAPI() {
    let server = require(Config.PROJECT_ROOT + '/' + Config.APP_SERVER_DEST + "/index");

    var args = process.argv.slice(2);
    server.init(+args[0] || 9001, args[1] || 'dev');
}