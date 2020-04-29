const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')
const makeDir = require('make-dir');
const sanitize = require("../../util/sanitize-filepath")

// Generic file operations for "brains" and "shapes"
//
module.exports = {

  listFiles: function (baseDir, subDir, res) {
    let listDir = path.join(baseDir, subDir)

    if(!listDir.endsWith(path.sep))
      listDir = listDir+path.sep

    if(!subDir.endsWith(path.sep))
      subDir = subDir+path.sep

    // check that the normalize path is the same as the concatenated. It is possible that these are not the same
    // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
    if (listDir !== path.normalize(listDir)) {
      console.log("'listDir' path with dots")
      res.status(403).send('Unable to list file')
      return
    }

    glob(listDir + "*", {}, function (er, files) {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({
        files: files.map(function (f) {
          let isDir = fs.lstatSync(f).isDirectory()
          return {
            name: path.basename(f),
            filePath: f.replace(baseDir, ""),
            folder: subDir,
            type: isDir ? "dir" : "file",
            dir: isDir
          }
        })
      }))
    })
  },

  getJSONFile: function (baseDir, subDir, res) {
    let file = path.join(baseDir, subDir)

    if (file !== path.normalize(file)) {
      console.log("'toDir' path with dots")
      res.status(403).send('Unable to read file')
      return
    }

    file = path.normalize(file)
    if(!file.startsWith(baseDir)){
      console.log("'subDir' isn't below baseDir")
      res.status(403).send('Unable to read file')
      return
    }

    if (!fs.existsSync(file)) {
      res.status(404).send('Not found')
      return
    }

    try {
      let readStream = fs.createReadStream(file)
      res.setHeader('Content-Type', 'application/json')
      readStream.pipe(res)
    } catch (exc) {
      res.status(404).send('Not found')
    }
  },

  getBase64Image: function (baseDir, subDir, res) {
    let file = path.join(baseDir, subDir)

    if (file !== path.normalize(file)) {
      console.log("'toDir' path with dots")
      res.status(403).send('Unable to read image')
      return
    }

    file = path.normalize(file)
    if(!file.startsWith(baseDir)){
      console.log("'subDir' isn't below baseDir")
      res.status(403).send('Unable to read image')
      return
    }

    if (!fs.existsSync(file)) {
      res.status(404).send('Not found')
      return
    }
    try {
      let pngFile = file.replace(".shape",".png")
      if(fs.existsSync(pngFile)) {
        fs.readFile(pngFile, (err, data) => {
          res.writeHead(200, {'Content-Type': 'image/png'})
          res.end(data)
        })
      }else {
        fs.readFile(file, (err, data) => {
          let json = JSON.parse(data)
          if (!json.image) {
            res.status(404).send('Not found')
            return
          }
          let base64data = json.image.replace(/^data:image\/png;base64,/, '')
          let img = Buffer.from(base64data, 'base64')
          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
          })
          res.end(img)
        })
      }
    } catch (exc) {
      res.status(404).send('Not found')
    }
  },


  /**
   * Rename a file or directory.
   *
   * @param baseDir
   * @param from
   * @param to
   * @param res
   */
  renameFile: function (baseDir, from, to, res) {
    to = sanitize(to)

    let fromDir = path.join(baseDir, from)
    let toDir = path.join(baseDir, to)
    let fromDirParent = path.dirname(fromDir)
    let toDirParent = path.dirname(toDir)

    // "from" must be exists
    if (!fs.existsSync(fromDir)) {
      console.log("'from' didn't exists")
      res.status(403).send('Unable to rename file')
      return
    }

    // check that the normalize path is the same the concatenated. It is possible the these are not the same
    // if the "from" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
    if (fromDir !== path.normalize(fromDir)) {
      console.log("'fromDir' path with dots")
      res.status(403).send('Unable to rename file')
      return
    }

    if (toDir !== path.normalize(toDir)) {
      console.log("'toDir' path with dots")
      res.status(403).send('Unable to rename file')
      return
    }

    // "from" and "to" directory must have the same parent directory. It is not allowed to move a directory out
    // of the tree with a rename operation
    if (fromDirParent !== toDirParent) {
      console.log("moving files out of parent directory is not allowed")
      res.status(403).send('Unable to rename file')
      return
    }

    if (fs.existsSync(toDir)) {
      console.log("'toDir' already exists")
      res.status(403).send('Unable to rename file')
      return
    }
    fs.rename(fromDir, toDir, err => {
      if (err) console.log(err)
      let isDir = fs.lstatSync(toDir).isDirectory()
      res.send({
        name: path.basename(to),
        filePath: to,
        folder:  path.dirname(to),
        type: isDir ? "dir" : "file",
        dir: isDir
      })
    })
  },


  /**
   * Delete a file or directory
   *
   * @param baseDir
   * @param subDir
   * @param res
   */
  deleteFile: function (baseDir, subDir, res) {
    let file = path.join(baseDir, subDir)
    // check that the normalize path is the same as the concatenated. It is possible that these are not the same
    // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
    if (file !== path.normalize(file)) {
      console.log("'file' path with dots")
      if(res) res.status(403).send('Unable to delete file')
      return
    }

    file = path.normalize(file)
    if(!file.startsWith(baseDir)){
      console.log("'subDir' isn't below baseDir")
      if(res) res.status(403).send('Unable to delete image')
      return
    }

    fs.unlink(file, err => {
      if (err) {
        // maybe a directory
        fs.removeSync(file)
      }
      if(res) res.send('true')
    })
  },



  createFolder: function (baseDir, subDir, res) {
    subDir = sanitize(subDir)

    let directory = path.join(baseDir, subDir)

    // check that the normalize path is the same as the concatenated. It is possible that these are not the same
    // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
    if (directory !== path.normalize(directory)) {
      console.log("'directory' path with dots")
      res.status(403).send('Unable to create folder')
      return
    }

    directory = path.normalize(directory)
    if(!directory.startsWith(baseDir)){
      console.log("'subDir' isn't below baseDir")
      res.status(403).send('Unable to delete image')
      return
    }

    makeDir(directory)
      .then(() => {
        res.send({
          name: path.basename(directory),
          filePath: directory,
          folder:  path.dirname(directory),
          type: "dir",
          dir: true
        })
      })
      .catch(() => {
        res.status(403).send('Unable to create directory')
      })
  },


  writeFile: async function (baseDir, subDir, content, res, callback) {
    subDir =  sanitize(subDir)

    let file = path.join(baseDir, subDir)
    let dir = path.dirname(file)+path.sep

    // check that the normalize path is the same as the concatenated. It is possible that these are not the same
    // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
    if (file !== path.normalize(file)) {
      console.log("'file' path with dots")
      res.status(403).send('Unable to write file')
      return
    }

    // normalize path must be below the parent directory
    //
    dir = path.normalize(dir)
    if(!dir.startsWith(baseDir)){
      console.log("'dir' path is out of baseDir")
      console.log("baseDir",baseDir)
      console.log("file", dir)
      res.status(403).send('Unable to write file')
      return
    }

    if (!fs.existsSync(dir)) {
      await makeDir(dir)
    }

    fs.writeFile(file, content, err => {
      if (err) console.log(err)
      if (typeof callback === "function") {
        callback(subDir, err)
      }
      res.setHeader('Content-Type', 'application/json')
      res.send({
        name: path.basename(subDir),
        filePath: subDir,
        folder:  path.dirname(subDir),
        type: "file",
        dir: false
      })
    })
  }
}

