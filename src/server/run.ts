import * as server from "./index";

var args = process.argv.slice(2);

server.init(+args[0] || 9001, args[1] || 'dev');