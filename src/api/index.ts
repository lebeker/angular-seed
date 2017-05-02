import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as routes from './routes';

import {Cache} from './db/redis';
import {Db} from './db/mongo';

/**
 * Client Dir
 * @note `api` default.
 */
var _clientDir = '../../client/';
var app: any = express();

export function init(port: number, env: string, mode: string = 'api') {

    _clientDir = _clientDir + env.toLowerCase();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(cookieParser());
    app.use(compression());

    // Init Cache
    new Cache;
    // Init Db
    new Db('test');

    app.all("/*", function (req: any, res: any, next: any) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,DELETE,OPTIONS");
        next();
    });

    /**
     * Full Mode.
     * @note Full mode serve both API & angular-index.html
     */
    if (mode === "full") {
        routes.init(app);

        let root = path.resolve(process.cwd());
        let clientRoot = path.resolve(process.cwd(), "./dist/client/dev");
        app.use(express.static(root));
        app.use(express.static(clientRoot));

        var renderIndex = (req: express.Request, res: express.Response) => {
            res.sendFile(path.resolve(__dirname, _clientDir + "/index.html"));
        };
        app.get("/*", renderIndex);

        /**
         * Api Routes for `Development`.
         */
    }

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
