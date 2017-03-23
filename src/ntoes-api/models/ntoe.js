var mongoose = require('mongoose'),
    NtoesSchema = new mongoose.Schema({
        name: String,
        completed: Boolean,
        note: String,
        updated_at: { type: Date, default: Date.now },
        //author: AuthorSchema
    });

module.exports = mongoose.model('Ntoe', NtoesSchema);