const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const makeDir = require('make-dir')
const path = require('path')
const fs = require('fs')
const bcrypt = require("bcrypt");


let db = null

let defaultUsers = [
  { id: "1", username: 'admin', password: 'secret', displayName: 'Admin', role:"admin", email: 'admin@example.com' },
  { id: "2", username: 'jack',  password: 'secret', displayName: 'Jack',  role:"user",  email: 'jack@example.com' },
  { id: "3", username: 'jill',  password: 'secret', displayName: 'Jill',  role:"user",  email: 'jill@example.com' }
]

exports.init = async function(app, args){
  let userDBDir  = path.join(args.folder, "users", path.sep)
  let userDBFile = path.join(userDBDir, 'db.json')
  let initialRun = !fs.existsSync(userDBFile)

  // Ensure that the required storage folder exists
  //
  makeDir(userDBDir)

  const adapter = new FileSync(userDBFile)
  db = low(adapter)

  // Set some defaults (required if your JSON file is empty)
  db.defaults({ users: [] })
    .write()

  // setup some default users if we start the first time
  //
  if(initialRun){
    defaultUsers.forEach( (user) => {
      bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash
        db.get("users")
          .push(user)
          .write()
      })
    })
  }
}

exports.findById = function(id, cb) {
  process.nextTick(function() {
    let user = db
      .get('users')
      .find({ id })
      .value()
    if (user) {
      cb(null, user)
    } else {
      cb(new Error('User ' + id + ' does not exist'))
    }
  })
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    let user = db
      .get('users')
      .find({ username })
      .value()
    if(user) {
      return cb(null, user)
    }
    else{
      return cb(new Error("not found"))
    }
  })
}

exports.all = function(cb) {
  process.nextTick(function() {
    let users = db
      .get('users')
      .value()
    return cb(null, users)
  })
}

exports.delete = function(id, cb) {
  process.nextTick(function() {
    db
      .get('users')
      .remove({ id })
      .write()
    return cb(null)
  })
}

exports.update = function(id, user, cb) {
  process.nextTick(function() {
    let currentUser = db
      .get('users')
      .find({ id })
      .value()
    if(currentUser) {
      Object.assign(currentUser, user)
      db
        .get('users')
        .find({id})
        .assign(currentUser)
        .write()
      return cb(null, currentUser)
    }
    else{
      return cp(new Error("unknown user"), null)
    }
  })
}


exports.create = function(user, cb) {
  process.nextTick(function() {
    bcrypt.hash(user.password, 10, function(err, hash) {
      user.password = hash
      db.get("users")
        .push(user)
        .write()
      return cb(null, user)
    })
  })
}
