import mongoose = require('mongoose');
import * as proto from '../../common/scientist';

export interface IScientistModel extends proto.Scientist, mongoose.Document { }


export var ScientistSchema = new mongoose.Schema({
    name: String,
    area: [String]
});

export var Scientist = mongoose.model('Scientist', ScientistSchema);
