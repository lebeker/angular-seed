// Load mongoose package
var mongoose = require('mongoose');

mongoose.Promise = Promise;
// Connect to MongoDB and create/use database called "ntoes"
mongoose.connect('mongodb://localhost/ntoes');
// Create a schema
var UserSchema = new mongoose.Schema({
        email: String,
        username: String,
        password: String
    }),
    AuthorSchema = new mongoose.Schema({
        name: String,
        user: UserSchema
    }),
    NtoesSchema = new mongoose.Schema({
        name: String,
        completed: Boolean,
        note: String,
        updated_at: { type: Date, default: Date.now },
        author: AuthorSchema
    });
// Create a model based on the schema
//var user = mongoose.model('Note', NtoesSchema);

var User = mongoose.model('User', UserSchema),
    Author = mongoose.model('Author', AuthorSchema),
    Ntoe = mongoose.model('Ntoe', NtoesSchema);

// Create a ntoe in memory
var ntoe = new Ntoe({name: 'Master2 NodeJS+', completed: false, note: 'Getting there...'});
// Save it to database
ntoe.save(function(err){
    if(err)
        console.log(err);
    else
        console.log('NEW NTOE: ', ntoe);
});

Ntoe.find({name:/^Master2/}, function(err, m) {
    var m1=m, a = new Author({name:'Anonimous'});
    a.save(function(err) {
        if (!err) {
            m.map(function(m2) {
                console.log(m2);
                m2.author = a;
                m2.save(function (e) {
                    if (!e)
                        console.log(e);
                });
            });
        } else {
            console.log('Errror');
        }
    });
});