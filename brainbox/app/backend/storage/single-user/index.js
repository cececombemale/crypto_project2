const path = require('path')
const express = require('express')
const colors = require('colors')
const makeDir = require('make-dir')

const generic = require("../_base_")
const update = require("../../update")
const {thumbnail} = require("../../converter/thumbnail")

// the permissions are exposed to the UI. The UI can enable/disable features regarding
// this settings
let defaultPermissions = require("./permissions")

// Storage backend for the personal usage
//
module.exports = {


  init: function(app, args){
    const brainsHomeDir   = args.folder + "brains"+path.sep
    const sheetsHomeDir   = args.folder + "sheets"+path.sep
    const sheetsAppDir    = path.normalize(path.join(__dirname, '..','..','..','repository','sheets')+path.sep)
    const shapesAppDir    = path.normalize(path.join(__dirname, '..','..','..','repository','shapes')+path.sep)
    const brainsAppDir    = path.normalize(path.join(__dirname, '..','..','..','repository','brains')+path.sep)

    // Ensure that the required storage folder exists
    //
    makeDir(sheetsHomeDir)
    makeDir(brainsHomeDir)


    console.log("| You are using the "+"'single-user'".bold.green+" file storage engine.                     |")
    console.log("| This kind of storage is perfect for personal usage.                      |")
    console.log("| You can choose another storage with the '--storage' command line argument|")
    console.log("|                                                                          |")
    console.log("| User File Locations:                                                     |")
    console.log("|    Simulator: "+brainsHomeDir)
    console.log("|    Author: "+sheetsHomeDir)

    app.use('/_common', express.static(__dirname + '/../../../frontend/_common'));
    app.use('/designer', express.static(__dirname + '/../../../frontend/designer'));
    app.use('/circuit', express.static(__dirname + '/../../../frontend/circuit'));
    app.use('/author', express.static(__dirname + '/../../../frontend/author'));
    app.use('/home', express.static(__dirname + '/../../../frontend/home'));

    app.get('/permissions', (req, res) => res.send(defaultPermissions))

    // =================================================================
    // Handle user Author files
    //
    // =================================================================
    app.get('/backend/user/sheet/list',    (req, res) => module.exports.listFiles(sheetsHomeDir,      req.query.path, res))
    app.get('/backend/user/sheet/get',     (req, res) => module.exports.getJSONFile(sheetsHomeDir,    req.query.filePath, res))
    app.post('/backend/user/sheet/delete', (req, res) => module.exports.deleteFile(sheetsHomeDir,     req.body.filePath, res))
    app.post('/backend/user/sheet/rename', (req, res) => module.exports.renameFile(sheetsHomeDir,     req.body.from, req.body.to, res))
    app.post('/backend/user/sheet/save',   (req, res) => module.exports.writeSheet(sheetsHomeDir,     req.body.filePath, req.body.content, res))
    app.post('/backend/user/sheet/folder', (req, res) => module.exports.createFolder(sheetsHomeDir,   req.body.filePath, res))
    app.get('/backend/user/sheet/pdf',     (req, res) => {
      let {render} = require("../../converter/pdf")
      render(`http://localhost:${args.port}/author/page.html?user=${req.query.file}`).then(pdf => {
        res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length})
        res.send(pdf)
      })
    })

    // =================================================================
    // Handle user brain files
    //
    // =================================================================
    app.get('/backend/user/brain/list',    (req, res) => module.exports.listFiles(brainsHomeDir,      req.query.path, res))
    app.get('/backend/user/brain/get',     (req, res) => module.exports.getJSONFile(brainsHomeDir,    req.query.filePath, res))
    app.get('/backend/user/brain/image',   (req, res) => module.exports.getBase64Image(brainsHomeDir, req.query.filePath, res))
    app.post('/backend/user/brain/delete', (req, res) => module.exports.deleteFile(brainsHomeDir,     req.body.filePath, res))
    app.post('/backend/user/brain/rename', (req, res) => module.exports.renameFile(brainsHomeDir,     req.body.from, req.body.to, res))
    app.post('/backend/user/brain/save',   (req, res) => module.exports.writeBrain(brainsHomeDir,     req.body.filePath, req.body.content, res))
    app.post('/backend/user/brain/folder', (req, res) => module.exports.createFolder(brainsHomeDir,   req.body.filePath, res))


    // =================================================================
    // Handle pre-installed brain files
    //
    // =================================================================
    app.get('/backend/global/brain/list',    (req, res) => module.exports.listFiles(brainsAppDir,      req.query.path, res))
    app.get('/backend/global/brain/get',     (req, res) => module.exports.getJSONFile(brainsAppDir,    req.query.filePath, res))
    app.get('/backend/global/brain/image',   (req, res) => module.exports.getBase64Image(brainsAppDir, req.query.filePath, res))
    app.post('/backend/global/brain/delete', (req, res) => module.exports.deleteFile(brainsAppDir,     req.body.filePath, res))
    app.post('/backend/global/brain/rename', (req, res) => module.exports.renameFile(brainsAppDir,     req.body.from, req.body.to, res))
    app.post('/backend/global/brain/save',   (req, res) => module.exports.writeBrain(brainsAppDir,     req.body.filePath, req.body.content, res))
    app.post('/backend/global/brain/folder', (req, res) => module.exports.createFolder(brainsAppDir,   req.body.filePath, res))

    // =================================================================
    // Handle pre-installed brain files
    //
    // =================================================================
    app.get('/backend/global/sheet/list',    (req, res) => module.exports.listFiles(sheetsAppDir,    req.query.path, res))
    app.get('/backend/global/sheet/get',     (req, res) => module.exports.getJSONFile(sheetsAppDir,  req.query.filePath, res))
    app.post('/backend/global/sheet/delete', (req, res) => module.exports.deleteFile(sheetsAppDir,   req.body.filePath, res))
    app.post('/backend/global/sheet/rename', (req, res) => module.exports.renameFile(sheetsAppDir,   req.body.from, req.body.to, res))
    app.post('/backend/global/sheet/save',   (req, res) => module.exports.writeSheet(sheetsAppDir,   req.body.filePath, req.body.content, res))
    app.post('/backend/global/sheet/folder', (req, res) => module.exports.createFolder(sheetsAppDir, req.body.filePath, res))
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
    app.post('/backend/global/shape/delete', (req, res) => module.exports.deleteFile(shapesAppDir,     req.body.filePath, res))
    app.post('/backend/global/shape/rename', (req, res) => module.exports.renameFile(shapesAppDir,     req.body.from, req.body.to, res))
    app.post('/backend/global/shape/save',   (req, res) => module.exports.writeShape(shapesAppDir,     req.body.filePath, req.body.content, req.body.commitMessage, res))
    app.post('/backend/global/shape/folder', (req, res) => module.exports.createFolder(shapesAppDir,   req.body.filePath, res))


    // =================================================================
    // Handle system update files
    //
    // =================================================================
    app.get('/backend/updates/shapes', (req, res) => update.getLatestShapeRelease(res))
    app.post('/backend/updates/shapes', async (req, res) => update.upgradeTo(shapesAppDir, req.body.url, res))
  },

  listFiles: generic.listFiles,
  getJSONFile: generic.getJSONFile,
  getBase64Image: generic.getBase64Image,
  renameFile: generic.renameFile,
  deleteFile: generic.deleteFile,
  writeFile: generic.writeFile,
  createFolder: generic.createFolder,

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
      thumbnail(baseDir, subDir).then(()=>{
        io.sockets.emit("file:generated", {
          filePath: subDir,
          imagePath: subDir.replace(".shape", ".png"),
          jsPath: subDir.replace(".shape", ".js")
        })
      })

      // commit the shape to the connected github backend
      // (if configured)
      update.commitShape(path.join(baseDir,subDir), subDir, reason)
    })
  },

  writeBrain: function (baseDir, subDir, content, res ) {
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

