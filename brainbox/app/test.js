let levelup = require('levelup')
let leveldown = require('leveldown')
let levelgraph = require('levelgraph')

db = levelgraph(levelup(leveldown("graph")))

db.put([{
  subject: "karl",
  predicate: "memberOf",
  object: "group1"
}, {
  subject: "mark",
  predicate: "memberOf",
  object: "group1"
}, {
  subject: "daniele",
  predicate: "memberOf",
  object: "group2"
}, {
  subject: "sheet1",
  predicate: "assignedTo",
  object: "group1"
}, {
  subject: "marco",
  predicate: "owner",
  object: "group1"
}], function () {

  db.get({
    predicate: "owner",
    subject: "marco"
  }, function(err, rv) {
    if (err) throw err;
    console.log("["+new String(rv).toString()+"]");
  });
});
