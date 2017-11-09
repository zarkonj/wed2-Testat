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

function sortImportance(callback) {
    db.find({}).sort({importance: 1}).exec(function (err, newDoc) {
        callback(err, newDoc);
    });
}

function sortDate(callback) {
    db.find({}).sort({doneuntil: 1}).exec(function (err, newDoc) {
        callback(err, newDoc);
    });
}

function readNote(noteID, callback) {
    db.findOne({_id: noteID}, function (err, newDoc) {
        if(callback) {
            callback(err, newDoc);
        }
    });
}

function updateNote(noteID, title, descr, importance, doneuntil, complete, callback){
    db.update({_id: noteID},{$set: {title: title, descr: descr, importance: importance, doneuntil: doneuntil, complete: complete}}, function (err, newDoc){
        if(callback) {
            callback(err, newDoc);
        }
    });
}

function deleteNote(noteID, callback) {
    db.remove({_id: noteID}, {}, function (err){
        callback(err);
    });
}
module.exports = {add : publicAdd, all : publicAll, sortImp : sortImportance, sortDat : sortDate, read : readNote, update : updateNote, delete : deleteNote};