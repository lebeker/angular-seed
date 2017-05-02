import * as express from 'express';
import * as services from './controllers/index';

export function init(app: express.Application) {
  services.init(app);
}
