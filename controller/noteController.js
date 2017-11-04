var store = require("../services/noteStore");

module.exports.shipiChopf = function (req, res) {
    res.render("note_detail.hbs", { title: "Shipichopf"} );
}