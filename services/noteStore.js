var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true })

function Note(title, descr, importance, doneuntil, complete) {
    this.title = title;
    this.descr = descr;
    this.importance = importance;
    this.doneuntil = doneuntil;
    this.complete = complete;
}

function publicAdd(title, descr, importance, doneuntil, complete, callback)
{
    var note = new Note(title, descr, importance, doneuntil, complete);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });

}

function publicAll(callback) {
    db.find({}, function (err, newDoc) {
       callback(err, newDoc);
    });
}
module.exports = {add : publicAdd, all : publicAll};