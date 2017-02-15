import mongoose = require('mongoose');
import { AScientist } from '../../common/scientist';

export interface IScientistModel extends AScientist, mongoose.Document { }

export var ScientistSchema = new mongoose.Schema({
    name: String,
    area: [String]
});

export var Scientist = mongoose.model('Scientist', ScientistSchema);
