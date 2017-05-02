import * as express from 'express';
import { ScientistController } from './scientist.controller';

export function init(app: express.Application) {
    ScientistController(app);
    console.log('ScientistController - started' );
}
