var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true })

function Note(title, descr, importance, complete) {
    this.title = title;
    this.descr = descr;
    this.importance = importance;
    this.complete = complete;
}

function publicAdd(title, descr, importance, complete, callback)
{
    var note = new Note(title, descr, importance, complete);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicGet(title, descr, importance, complete, callback)
{
    db.find({}, function(err, newDoc){
        callback( err, newDoc);
    });
}

module.exports = {add : publicAdd, get : publicGet};