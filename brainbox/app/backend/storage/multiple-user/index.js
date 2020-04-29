const colors = require('colors')
const path = require('path')
const express = require('express')
const makeDir = require('make-dir')
const uuid = require('uuid/v4')
const shortid = require('shortid')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const Session = require('express-session')
const FileStore = require('session-file-store')(Session)
const bcrypt = require("bcrypt")
const sanitize = require("../../util/sanitize-filepath")
const generic = require("../_base_")
const update = require("../../update")
const {thumbnail, generateShapeIndex} = require("../../converter/thumbnail")
const db = require('./db')
let {token_set, token_get} = require("./token-user")

let permissionsAnonym = require("./permissions-anonym")
let permissionsUser   = require("./permissions-user")
let permissionsAdmin  = require("./permissions-admin")

let brainsHomeDir = null
let sheetsHomeDir = null
let brainsSharedDir = null
let sheetsSharedDir = null

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err)   { return cb(null, false) }
      if (!user) { return cb(null, false) }
      bcrypt.compare(password, user.password)
        .then(function(result) {
          if(result){
            return cb(null, user)
          }
          return cb(null, false)
        })
    })
  }))

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id)
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(null, false)
    }
    cb(null, user)
  });
});

// convertToUserBaseFolder
function userFolder(baseFolder, req){
  return baseFolder+ req.user.username+path.sep
}


function ensureLoggedIn(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};
  let url = options.redirectTo || '/login';
  let setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
  return function(req, res, next) {
    // token is required for server side rendering with
    // puppeteer
    let token = req.query.token
    if(token){
      let user = token_get(token)
      if(!req.user){
        req.user = user
      }
    }

    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect(url);
    }
    next();
  }
}

function ensureAdminLoggedIn(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};
  let url = options.redirectTo || '/login';
  let setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated() || req.user.role !=="admin") {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect(url);
    }
    next();
  }
}


// Storage backend for the personal usage
//
module.exports = {

  init: function(app, args){

    db.users.init(app, args)

    // add & configure middleware
    app.use(Session({
      genid: () =>  uuid(),
      store: new FileStore(),
      secret: 'ASDFQ"§$%$E&%RTZHFGDSAW$%/&EUTZDJFGH',
      resave: false,
      saveUninitialized: true
    }))

    // Configure view engine to render EJS templates for the login page
    //
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize())
    app.use(passport.session())

    // inject the authentication endpoints.
    //
    app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), this.onLoggedIn)
    app.use('/login',  (req, res, next)=>{
      req.session.returnTo = req.query.returnTo
      next()
    },express.static(__dirname + '/../../../frontend/login'))

    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect( req.query.returnTo || '/')
    })

    // calculate the persistence folder for the brains/sheets files
    //
    brainsHomeDir   = path.join(args.folder, "brains", path.sep)
    sheetsHomeDir   = path.join(args.folder, "sheets", path.sep)
    brainsSharedDir = path.join(args.folder, "shared", "brains", path.sep)
    sheetsSharedDir = path.join(args.folder, "shared", "sheets", path.sep)
    const sheetsAppDir    = path.normalize(path.join(__dirname, '..', '..', '..', 'repository', 'sheets')+path.sep)
    const shapesAppDir    = path.normalize(path.join(__dirname, '..', '..', '..', 'repository', 'shapes')+path.sep)
    const brainsAppDir    = path.normalize(path.join(__dirname, '..', '..', '..', 'repository', 'brains')+path.sep)

    // Ensure that the required storage folder exists
    //
    makeDir(brainsSharedDir)
    makeDir(sheetsSharedDir)
    makeDir(sheetsHomeDir)
    makeDir(brainsHomeDir)

    console.log("| You are using the "+"'multiple-user'".bold.green+" file storage engine.                   |")
    console.log("| This kind of storage is perfect for small or medium user groups.         |")
    console.log("| It contains a simple user management and a basic login page.             |")
    console.log("|                                                                          |")
    console.log("| You can choose another storage with the '--storage' command line argument|")
    console.log("|                                                                          |")
    console.log("| User File Locations:                                                     |")
    console.log("|    Simulator: "+brainsHomeDir)
    console.log("|    Author: "+sheetsHomeDir)


    // the UI ask for the permissions of the related user to setup the UI in good fashion.
    // This is just for the UI part. the backend protects the endpoints as well.
    //
    app.get('/permissions', (req, res) => {
      if(!req.isAuthenticated || !req.isAuthenticated()) {
        res.send(permissionsAnonym)
      }
      else{
        if(req.user.role === "admin"){
          res.send(permissionsAdmin)
        }
        else{
          res.send(permissionsUser)
        }
      }
    })

    // Rest password API
    // only an admin can create a "reset password" request right now
    //
    let passwordRest = require("./password-rest")
    // endpoint to generate a password reset token
    app.post("/password/token", ensureAdminLoggedIn(), passwordRest.token_post)
    // endpoint to check if the token is valid
    app.get("/password/token/:token", passwordRest.token_get)
    // endpoint to set the password
    app.post("/password", passwordRest.set)
    // endpoint to serve the ui for the password reset
    app.use("/password", express.static(__dirname + '/../../../frontend/resetpwd'))
    // endpoint to check if the token is valid


    // Usermanagement API
    //
    let userRest = require("./user-rest")
    app.get('/backend/admin/user',        ensureAdminLoggedIn(), userRest.list)
    app.get('/backend/admin/user/:id',    ensureAdminLoggedIn(), userRest.get)
    app.delete('/backend/admin/user/:id', ensureAdminLoggedIn(), userRest.delete)
    app.put('/backend/admin/user/:id',    ensureAdminLoggedIn(), userRest.put)
    app.post('/backend/admin/user',       ensureAdminLoggedIn(), userRest.post)
    app.get('/userinfo',                                         userRest.userinfo)


    // Serve the static content for the three different apps of brainbox
    // (designer, simulator, author)
    //
    app.use('/_common',  express.static(__dirname + '/../../../frontend/_common'));
    app.use('/designer', express.static(__dirname + '/../../../frontend/designer'));
    app.use('/circuit',  express.static(__dirname + '/../../../frontend/circuit'));
    app.use('/author',   express.static(__dirname + '/../../../frontend/author'));
    app.use('/user',     ensureAdminLoggedIn(), express.static(__dirname + '/../../../frontend/user'));
    app.use('/home', express.static(__dirname + '/../../../frontend/home'));


    // =================================================================
    // endpoints for shared circuits / sheets
    // It is even allowed for unknown users
    // =================================================================
    app.get('/backend/shared/sheet/get',   (req, res) => module.exports.getJSONFile(sheetsSharedDir, req.query.filePath, res))
    app.post('/backend/shared/sheet/save', (req, res) => module.exports.writeSheet(sheetsSharedDir,  shortid.generate()+".sheet", req.body.content, res))
    app.get('/backend/shared/brain/get',   (req, res) => module.exports.getJSONFile(brainsSharedDir, req.query.filePath, res))
    app.post('/backend/shared/brain/save', (req, res) => module.exports.writeBrain(brainsSharedDir,  shortid.generate()+".brain", req.body.content, res))


    // =================================================================
    // Handle user Author files
    //
    // =================================================================
    app.get('/backend/user/sheet/list',   ensureLoggedIn(), (req, res) => module.exports.listFiles(userFolder(sheetsHomeDir, req),      req.query.path, res))
    app.get('/backend/user/sheet/get',    ensureLoggedIn(), (req, res) => module.exports.getJSONFile(userFolder(sheetsHomeDir, req),    req.query.filePath, res))
    app.post('/backend/user/sheet/delete',ensureLoggedIn(), (req, res) => module.exports.deleteFile(userFolder(sheetsHomeDir, req),     req.body.filePath, res))
    app.post('/backend/user/sheet/rename',ensureLoggedIn(), (req, res) => module.exports.renameFile(userFolder(sheetsHomeDir, req),     req.body.from, req.body.to, res))
    app.post('/backend/user/sheet/save',  ensureLoggedIn(), (req, res) => module.exports.writeSheet(userFolder(sheetsHomeDir, req),     req.body.filePath, req.body.content, res))
    app.post('/backend/user/sheet/folder',ensureLoggedIn(), (req, res) => module.exports.createFolder(userFolder(sheetsHomeDir, req),   req.body.filePath, res))
    app.get('/backend/user/sheet/pdf',    ensureLoggedIn(), (req, res) => {
        let {render} = require("../../converter/pdf")
        let id = token_set( req.user)
        render(`http://localhost:${args.port}/author/page.html?user=${req.query.file}&token=${id}`).then(pdf => {
          res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length})
          res.send(pdf)
        })
    })


    // =================================================================
    // Handle user brain files
    //
    // =================================================================
    app.get('/backend/user/brain/list',    ensureLoggedIn(), (req, res) => module.exports.listFiles(userFolder(brainsHomeDir, req),      req.query.path, res))
    app.get('/backend/user/brain/get',     ensureLoggedIn(), (req, res) => module.exports.getJSONFile(userFolder(brainsHomeDir, req),    req.query.filePath, res))
    app.get('/backend/user/brain/image',   ensureLoggedIn(), (req, res) => module.exports.getBase64Image(userFolder(brainsHomeDir, req), req.query.filePath, res))
    app.post('/backend/user/brain/delete', ensureLoggedIn(), (req, res) => module.exports.deleteFile(userFolder(brainsHomeDir, req),     req.body.filePath, res))
    app.post('/backend/user/brain/rename', ensureLoggedIn(), (req, res) => module.exports.renameFile(userFolder(brainsHomeDir, req),     req.body.from, req.body.to, res))
    app.post('/backend/user/brain/save',   ensureLoggedIn(), (req, res) => module.exports.writeBrain(userFolder(brainsHomeDir, req),     req.body.filePath, req.body.content, res))
    app.post('/backend/user/brain/folder', ensureLoggedIn(), (req, res) => module.exports.createFolder(userFolder(brainsHomeDir, req),   req.body.filePath, res))


    // =================================================================
    // Handle pre-installed brain files
    //
    // =================================================================
    app.get('/backend/global/brain/list',    (req, res) => module.exports.listFiles(brainsAppDir,      req.query.path, res))
    app.get('/backend/global/brain/get',     (req, res) => module.exports.getJSONFile(brainsAppDir,    req.query.filePath, res))
    app.get('/backend/global/brain/image',   (req, res) => module.exports.getBase64Image(brainsAppDir, req.query.filePath, res))
    app.post('/backend/global/brain/delete', ensureAdminLoggedIn(), (req, res) => module.exports.deleteFile(brainsAppDir,     req.body.filePath, res))
    app.post('/backend/global/brain/rename', ensureAdminLoggedIn(), (req, res) => module.exports.renameFile(brainsAppDir,     req.body.from, req.body.to, res))
    app.post('/backend/global/brain/save',   ensureAdminLoggedIn(), (req, res) => module.exports.writeBrain(brainsAppDir,     req.body.filePath, req.body.content, res))
    app.post('/backend/global/brain/folder', ensureAdminLoggedIn(), (req, res) => module.exports.createFolder(brainsAppDir,   req.body.filePath, res))

    // =================================================================
    // Handle pre-installed sheet files
    //
    // =================================================================
    app.get('/backend/global/sheet/list',    (req, res) => module.exports.listFiles(sheetsAppDir,    req.query.path, res))
    app.get('/backend/global/sheet/get',     (req, res) => module.exports.getJSONFile(sheetsAppDir,  req.query.filePath, res))
    app.post('/backend/global/sheet/delete', ensureAdminLoggedIn(), (req, res) => module.exports.deleteFile(sheetsAppDir,   req.body.filePath, res))
    app.post('/backend/global/sheet/rename', ensureAdminLoggedIn(), (req, res) => module.exports.renameFile(sheetsAppDir,   req.body.from, req.body.to, res))
    app.post('/backend/global/sheet/save',   ensureAdminLoggedIn(), (req, res) => module.exports.writeSheet(sheetsAppDir,   req.body.filePath, req.body.content, res))
    app.post('/backend/global/sheet/folder', ensureAdminLoggedIn(), (req, res) => module.exports.createFolder(sheetsAppDir, req.body.filePath, res))
    app.get('/backend/global/sheet/pdf',     (req, res) => {
      let {render} = require("../../converter/pdf")
      render(`http://localhost:${args.port}/author/page.html?global=${req.query.file}`).then(pdf => {
        res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length})
        res.send(pdf)
      })
    })

    // =================================================================
    // Handle system shape files
    //
    // =================================================================
    app.use('/shapes/global', express.static(shapesAppDir));
    app.get('/backend/global/shape/list',    (req, res) => module.exports.listFiles(shapesAppDir,      req.query.path, res))
    app.get('/backend/global/shape/get',     (req, res) => module.exports.getJSONFile(shapesAppDir,    req.query.filePath, res))
    app.get('/backend/global/shape/image',   (req, res) => module.exports.getBase64Image(shapesAppDir, req.query.filePath, res))
    app.post('/backend/global/shape/delete', ensureAdminLoggedIn(), (req, res) => {
      module.exports.deleteFile(shapesAppDir, req.body.filePath)
      module.exports.deleteFile(shapesAppDir, req.body.filePath.replace(".shape",".js"))
      module.exports.deleteFile(shapesAppDir, req.body.filePath.replace(".shape",".md"))
      module.exports.deleteFile(shapesAppDir, req.body.filePath.replace(".shape",".custom"))
      module.exports.deleteFile(shapesAppDir, req.body.filePath.replace(".shape",".png"), res)
      generateShapeIndex()
    })
    app.post('/backend/global/shape/rename', ensureAdminLoggedIn(), (req, res) => module.exports.renameFile(shapesAppDir,   req.body.from, req.body.to, res))
    app.post('/backend/global/shape/save',   ensureAdminLoggedIn(), (req, res) => module.exports.writeShape(shapesAppDir,   req.body.filePath, req.body.content, req.body.commitMessage, res))
    app.post('/backend/global/shape/folder', ensureAdminLoggedIn(), (req, res) => module.exports.createFolder(shapesAppDir, req.body.filePath, res))

    // =================================================================
    // Handle system update files
    //
    // =================================================================
    app.get('/backend/updates/shapes',  ensureAdminLoggedIn(), (req, res) => update.getLatestShapeRelease(res))
    app.post('/backend/updates/shapes', ensureAdminLoggedIn(),  async (req, res) => update.upgradeTo(shapesAppDir, req.body.url, res))
  },

  listFiles: generic.listFiles,
  getJSONFile: generic.getJSONFile,
  getBase64Image: generic.getBase64Image,
  renameFile: generic.renameFile,
  deleteFile: generic.deleteFile,
  writeFile: generic.writeFile,
  createFolder: generic.createFolder,

  onLoggedIn(req, res){
    let returnTo = req.session.returnTo || '/'
    res.redirect(returnTo)
    makeDir(sheetsHomeDir+req.user.username)
    makeDir(brainsHomeDir+req.user.username)
  },

  writeShape: function (baseDir, subDir, content, reason, res ){
    const io = require('../../comm/websocket').io

    module.exports.writeFile(baseDir, subDir, content, res, (err)=>{
      // inform the browser that the processing of the
      // code generation is ongoing
      //
      io.sockets.emit("file:generating", {
        filePath: subDir
      })

      // create the js/png/md async to avoid a blocked UI
      //
      thumbnail(baseDir, subDir)

      io.sockets.emit("file:generated", {
        filePath: subDir,
        imagePath: subDir.replace(".shape", ".png"),
        jsPath: subDir.replace(".shape", ".js")
      })

      // commit the shape to the connected github backend
      // (if configured)
      update.commitShape(path.join(baseDir,subDir), subDir, reason)
    })
  },

  writeBrain: function (baseDir, subDir, content, res ) {
    // "sanitize" is done in the base implementation as well. But we new the 'sanitize' in this method
    // as well for the socket.emit method.
    subDir = sanitize(subDir)
    module.exports.writeFile(baseDir, subDir, content, res, (err) => {
      const io = require('../../comm/websocket').io
      io.sockets.emit("brain:generated", {
        filePath: subDir
      })
    })
  },

  writeSheet: function (baseDir, subDir, content, res ) {
    module.exports.writeFile(baseDir, subDir, content, res)
  }

}

