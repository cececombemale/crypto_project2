const _base_ = require("../_base_")
const path = require('path')
const express = require('express')
const shortid = require('shortid')
const colors = require('colors')
const makeDir = require('make-dir')

// central hash map for all leveldb instances. The key for the map is "brainsHomeDir" and "sheetsHomeDir"
// We map the files to leveldb keys for the persistence
//
let dbs = []

// the permissions are exposed to the UI. The UI can enable/disable features regarding
// to the settings. Each persistence has its very own behaviour and feature set
//
let defaultPermissions = require("./permissions")

module.exports = {

  // Init the persistence
  //
  init: async function(app, args){
    let folder = args.folder

    const brainsHomeDir   = path.join(folder ,"brains_db")
    const sheetsHomeDir   = path.join(folder ,"sheet_db")
    const shapeAppDir     = path.normalize(path.join(__dirname, '..', '..', '..', 'repository','shapes')+path.sep)
    const brainsAppDir    = path.normalize(path.join(__dirname, '..', '..', '..', 'repository','brains')+path.sep)
    const sheetsAppDir    = path.normalize(path.join(__dirname, '..', '..', '..', 'repository','sheets')+path.sep)

    // Ensure that the required storage folder exists
    //
    await makeDir(brainsHomeDir).catch( err => {
      console.log(err)
    })
    await makeDir(sheetsHomeDir).catch( err => {
      console.log(err)
    })

    let levelup = require('levelup')
    let leveldown = require('leveldown')
    dbs[brainsHomeDir]=levelup(leveldown(brainsHomeDir))
    dbs[sheetsHomeDir]=levelup(leveldown(sheetsHomeDir))

    console.log("| You are using the "+"'hosted'".bold.green+" file storage engine.                          |")
    console.log("| This kind of installation is perfect for public access. It works by      |")
    console.log("| allowing "+"anyone".bold+" to create “circuits” and save them without user/pwd.     |")
    console.log("| You can then display those circuits on your profile, take feedback, and  |")
    console.log("| continue to edit those circuits at any time. Each save operation creates |")
    console.log("| a new file and access URL. It is not possible to change a file, the      |")
    console.log("| System creates always a new one. It works like https://codepen.io        |")
    console.log("|                                                                          |")
    console.log("| "+"File Location:".bold+"                                                           |")
    console.log("|    Simulator: "+brainsHomeDir)
    console.log("|    Sheets: "+sheetsHomeDir)


    // =================================================================
    // Only supported URLs are listed here. e.g. write (POST) operations
    // to a global shape or sheet ends in a 404
    // In this case only TWO post operation allows. "user.sheet" and "user.brain"
    // =================================================================

    app.use('/_common',  express.static(__dirname + '/../../../frontend/_common'));
    app.use('/designer', express.static(__dirname + '/../../../frontend/designer'));
    app.use('/circuit',  express.static(__dirname + '/../../../frontend/circuit'));
    app.use('/author',   express.static(__dirname + '/../../../frontend/author'));
    app.use('/home', express.static(__dirname + '/../../../frontend/home'));

    app.get('/permissions', (req, res) => res.send(defaultPermissions))

    // =================================================================
    // Handle Sheet files
    //
    // =================================================================
    app.get('/backend/user/sheet/get',     (req, res) => module.exports.getJSONFile(sheetsHomeDir,    req.query.filePath, res))
    app.post('/backend/user/sheet/save',   (req, res) => module.exports.writeSheet(sheetsHomeDir,      req.body.filePath, req.body.content, res))


    // =================================================================
    // Handle brain files
    //
    // =================================================================
    app.get('/backend/user/brain/get',     (req, res) => module.exports.getJSONFile(brainsHomeDir,    req.query.filePath, res))
    app.get('/backend/user/brain/image',   (req, res) => module.exports.getBase64Image(brainsHomeDir, req.query.filePath, res))
    app.post('/backend/user/brain/save',   (req, res) => module.exports.writeBrain(brainsHomeDir,      req.body.filePath, req.body.content, res))


    // =================================================================
    // Handle pre-installed brain files
    // (processed by the "_base_" filesystem based implementation
    // =================================================================
    app.get('/backend/global/brain/list',  (req, res) => _base_.listFiles(brainsAppDir, req.query.path, res))
    app.get('/backend/global/brain/get',   (req, res) => _base_.getJSONFile(brainsAppDir, req.query.filePath, res))
    app.get('/backend/global/brain/image', (req, res) => _base_.getBase64Image(brainsAppDir, req.query.filePath, res))


    // =================================================================
    // Handle pre-installed sheet files
    // (processed by the "_base_" filesystem based implementation
    // =================================================================
    app.get('/backend/global/sheet/list',  (req, res) => _base_.listFiles(sheetsAppDir, req.query.path, res))
    app.get('/backend/global/sheet/get',   (req, res) => _base_.getJSONFile(sheetsAppDir, req.query.filePath, res))
    app.get('/backend/global/sheet/image', (req, res) => _base_.getBase64Image(sheetsAppDir, req.query.filePath, res))


    // =================================================================
    // Handle system shape files
    // (processed by the "_base_" filesystem based implementation
    // =================================================================
    app.use('/shapes/global', express.static(shapeAppDir));
    app.get('/backend/global/shape/list',  (req, res) => _base_.listFiles(shapeAppDir, req.query.path, res))
    app.get('/backend/global/shape/get',   (req, res) => _base_.getJSONFile(shapeAppDir, req.query.filePath, res))
    app.get('/backend/global/shape/image', (req, res) => _base_.getBase64Image(shapeAppDir, req.query.filePath, res))
  },


  getJSONFile: function (baseDir, subDir, res) {
    // you are asking for a leveldb which didn't exists
    if(!(baseDir in dbs)){
      res.status(404).send('Not found')
    }

    dbs[baseDir].get(subDir, (err, value) => {
        if(err) {
          // you are asking for a key which didn't exists
          res.status(404).send('Not found')
        }
        else {
          res.setHeader('Content-Type', 'application/json')
          res.send(value)
        }
    })
  },

  getBase64Image: function (baseDir, subDir, res) {
    // you are asking for a leveldb which didn't exists
    if(!(baseDir in dbs)){
      res.status(404).send('Not found')
    }

    dbs[baseDir].get(subDir, (err, contents) => {
      if (err) {
        res.status(404).send('Not found')
      } else {
        let json = JSON.parse(contents)
        let base64data = json.image.replace(/^data:image\/png;base64,/, '')
        let img = Buffer.from(base64data, 'base64')
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': img.length
        })
        res.end(img)
      }
    })
  },

  writeBrain: (baseDir, subDir, content, res ) => {
    // every save of a file ends in a NEW file. Like a codepen page.
    // The new filename is the return value of this call
    //
    module.exports.writeFile(baseDir, shortid.generate()+".brain", content, res, (newSubDir, err)=>{
      if (err) {
        res.status(403).send('No permission')
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.send({
          name: newSubDir,
          filePath: newSubDir,
          folder: "",
          type: "file",
          dir: false
        })
      }
    })
  },

  writeSheet: (baseDir, subDir, content, res ) => {
    // every save of a file ends in a NEW file. Like a codepen page.
    // The new filename is the return value of this call
    //
    module.exports.writeFile(baseDir, shortid.generate()+".sheet", content, res, (newSubDir, err)=>{
      if (err) {
        res.status(403).send('No permission')
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.send({
          name: newSubDir,
          filePath: newSubDir,
          folder: "",
          type: "file",
          dir: false
        })
      }
    })
  },

  writeFile: function (baseDir, subDir, content, res, callback) {
    if(!(baseDir in dbs)){
      callback( null, 'Not found')
    }

    dbs[baseDir].put(subDir, content, err => {
      if(typeof callback === "function") {
        callback(subDir, err)
      }
    })
  }
}

