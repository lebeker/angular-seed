import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as routes from './routes';

import { Cache } from './db/redis';
import { Db } from './db/mongo';

/**
 * Client Dir
 * @note `dev` default.
 */
var _clientDir = '../../client/dev';
var app: any = express();

export function init(port: number, mode: string) {

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(cookieParser());
    app.use(compression());

    // Init Cache
    new Cache;
    // Init Db
    new Db('test');

    /**
     * Dev Mode.
     * @note Dev server will only give for you middleware.
     */

    routes.init(app);

    /**
     * Server with gzip compression.
     */
    return new Promise<http.Server>((resolve, reject) => {
        let server = app.listen(port, () => {
            var port = server.address().port;
            console.log('App is listening on port:' + port);
            resolve(server);
        });
    }).catch((e) => {
        if (e.syscall !== 'listen') {
            throw e;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (e.code) {
            case 'EACCES':
                console.error('\u001B[31m' + bind + ' requires elevated privileges' + '\u001B[0m');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error('\u001B[31m' + bind + ' is already in use' + '\u001B[0m');
                process.exit(1);
                break;
            default:
                throw e;
        }
    });
};
